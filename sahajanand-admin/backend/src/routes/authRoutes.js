import crypto from 'crypto'
import express from 'express'
import bcrypt from 'bcryptjs'
import multer from 'multer'
import Admin from '../models/Admin.js'
import { requireAdmin, signToken } from '../middleware/auth.js'
import { createLimiter } from '../middleware/rateLimit.js'
import { sendWithResend } from '../services/resendMailer.js'

const router = express.Router()

const BCRYPT_COST = 12
const RESET_LINK_MINUTES = 30
// Compared against when the email is unknown, so a wrong email and a wrong password take the same time
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', BCRYPT_COST)

const resetRequests = createLimiter({ windowMs: 60 * 60 * 1000, max: 5 })
const resetAttempts = createLimiter({ windowMs: 60 * 60 * 1000, max: 10 })

const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const sha256 = (value) => crypto.createHash('sha256').update(value).digest('hex')
const adminAppUrl = () => (process.env.ADMIN_APP_URL || 'http://localhost:5174').replace(/\/$/, '')

const tooMany = (res) =>
  res.status(429).json({
    success: false,
    message: 'Too many attempts. Please wait a while and try again.',
  })

// POST /api/auth/login
// multer().none() also reads multipart "form-data" bodies (e.g. API clients); JSON and urlencoded pass straight through
router.post('/login', multer().none(), async (req, res) => {
  try {
    const body = req.body || {}
    const email = text(body.email, 254).toLowerCase()
    const password = typeof body.password === 'string' ? body.password : ''

    const admin = email ? await Admin.findOne({ email }).select('+passwordHash') : null
    const hash = admin ? admin.passwordHash : DUMMY_HASH
    const typed = password.slice(0, 200)
    // Passwords copied from a chat or document often carry a trailing space/newline: accept those too
    // (an exact match is always tried first, so passwords that really contain spaces keep working)
    const matches =
      (await bcrypt.compare(typed, hash)) ||
      (typed.trim() !== typed && typed.trim() !== '' && (await bcrypt.compare(typed.trim(), hash)))

    if (!admin || !matches) {
      const reason = !email ? 'no email in the request' : !admin ? 'no admin account with that email' : 'wrong password'

      console.warn(
        `Login rejected (${reason}) | email=${JSON.stringify(email)} | password length=${typed.length} | content-type=${req.headers['content-type'] || 'none'}`,
      )

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    res.json({
      success: true,
      token: signToken(admin),
      admin: { email: admin.email },
    })
  } catch (error) {
    console.error('Login failed:', error)

    res.status(500).json({ success: false, message: 'Unable to log in right now' })
  }
})

// GET /api/auth/me - lets the app confirm a stored token is still accepted
router.get('/me', requireAdmin, (req, res) => {
  res.json({ success: true, admin: { email: req.admin.email } })
})

// POST /api/auth/forgot-password - emails a one-time reset link
router.post('/forgot-password', async (req, res) => {
  try {
    if (resetRequests.isBlocked(req.ip)) return tooMany(res)
    resetRequests.hit(req.ip)

    const email = text(req.body.email, 254).toLowerCase()
    const admin = email ? await Admin.findOne({ email }) : null

    // Same answer whether or not the email belongs to an admin
    const reply = {
      success: true,
      message: 'If that email belongs to the admin account, a password reset link has been sent.',
    }

    if (!admin) return res.json(reply)

    const token = crypto.randomBytes(32).toString('hex')

    admin.resetTokenHash = sha256(token)
    admin.resetTokenExpires = new Date(Date.now() + RESET_LINK_MINUTES * 60 * 1000)
    await admin.save()

    const link = `${adminAppUrl()}/reset-password?token=${token}`

    try {
      await sendWithResend({
        to: admin.email,
        subject: 'Reset your Sahajanand Admin password',
        text: [
          'We received a request to reset the password for the Sahajanand Admin Panel.',
          '',
          `Open this link to choose a new password (valid for ${RESET_LINK_MINUTES} minutes, one use only):`,
          link,
          '',
          'If you did not ask for this, you can ignore this email; your password stays unchanged.',
        ].join('\n'),
      })
    } catch (error) {
      console.error('Failed to send password reset email:', error)

      admin.resetTokenHash = undefined
      admin.resetTokenExpires = undefined
      await admin.save()

      return res.status(500).json({
        success: false,
        message: 'Unable to send the reset email right now. Please try again later.',
      })
    }

    res.json(reply)
  } catch (error) {
    console.error('Forgot password failed:', error)

    res.status(500).json({ success: false, message: 'Unable to process the request right now' })
  }
})

// POST /api/auth/reset-password - sets a new password from the emailed token
router.post('/reset-password', async (req, res) => {
  try {
    if (resetAttempts.isBlocked(req.ip)) return tooMany(res)
    resetAttempts.hit(req.ip)

    const token = text(req.body.token, 200)
    const password = typeof req.body.password === 'string' ? req.body.password : ''

    if (password.length < 8 || password.length > 128 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters and include a letter and a number',
      })
    }

    const admin = token
      ? await Admin.findOne({
          resetTokenHash: sha256(token),
          resetTokenExpires: { $gt: new Date() },
        })
      : null

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: 'This reset link is invalid or has expired. Please request a new one.',
      })
    }

    admin.passwordHash = await bcrypt.hash(password, BCRYPT_COST)
    admin.passwordChangedAt = new Date()
    admin.resetTokenHash = undefined
    admin.resetTokenExpires = undefined
    await admin.save()

    res.json({ success: true, message: 'Your password has been reset. You can now log in.' })
  } catch (error) {
    console.error('Reset password failed:', error)

    res.status(500).json({ success: false, message: 'Unable to reset the password right now' })
  }
})

export default router
