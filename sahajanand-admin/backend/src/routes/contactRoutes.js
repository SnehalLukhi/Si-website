import express from 'express'
import mongoose from 'mongoose'
import ContactInquiry from '../models/ContactInquiry.js'
import { sendWithResend } from '../services/resendMailer.js'
import { requireAdmin } from '../middleware/auth.js'

const router = express.Router()
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COUNTRY_CODE_PATTERN = /^\+\d{1,4}$/

const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

// Optional: a LinkedIn address, with or without https://. Returns '' for none, null for something that is not LinkedIn.
const cleanLinkedIn = (value) => {
  if (!value) return ''

  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)
    const host = url.hostname.toLowerCase()

    if (host !== 'linkedin.com' && !host.endsWith('.linkedin.com')) return null

    return url.toString()
  } catch {
    return null
  }
}

router.post('/', async (req, res) => {
  try {
    const firstName = text(req.body.firstName, 100)
    const lastName = text(req.body.lastName, 100)
    const countryCode = text(req.body.countryCode, 6)
    const phone = text(req.body.phone, 30)
    const email = text(req.body.email, 254)
    const linkedin = cleanLinkedIn(text(req.body.linkedin, 300))
    const message = text(req.body.message, 5000)

    if (!firstName || !lastName || !phone || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields',
      })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      })
    }

    if (!COUNTRY_CODE_PATTERN.test(countryCode) || !/^[\d\s()-]{4,20}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number',
      })
    }

    if (linkedin === null) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid LinkedIn profile link',
      })
    }

    const inquiry = await ContactInquiry.create({
      firstName,
      lastName,
      countryCode,
      phone,
      email,
      linkedin,
      message,
    })

    // The inquiry is already saved; if Resend fails the record stays and the error is logged by the catch below
    try {
      await sendWithResend({
        subject: `New Contact Us Inquiry - ${firstName} ${lastName}`.replace(/[\r\n]+/g, ' ').trim(),
        // Replying to the notification goes straight to the visitor; the sender stays the verified address
        replyTo: email,
        text: [
          'New Contact Us Inquiry',
          '',
          `Full Name: ${firstName}`,
          `Last Name: ${lastName}`,
          `Phone Number: ${countryCode} ${phone}`,
          `Email: ${email}`,
          `LinkedIn Profile: ${linkedin || 'Not provided'}`,
          '',
          'Message:',
          message,
        ].join('\n'),
      })
    } catch (emailError) {
      await ContactInquiry.findByIdAndUpdate(inquiry._id, {
        emailStatus: 'failed',
        emailError: String(emailError?.message || emailError).slice(0, 500),
      }).catch(() => {})
      throw emailError
    }

    await ContactInquiry.findByIdAndUpdate(inquiry._id, { emailStatus: 'sent' }).catch(() => {})

    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
    })
  } catch (error) {
    console.error('Failed to submit contact inquiry:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({
      createdAt: -1,
    })

    res.json({
      success: true,
      inquiries,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries',
    })
  }
})

// Delete one inquiry. The router only protects GET, and this route is also reachable with a token-less request,
// so admin login is required here explicitly.
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry id' })
    }

    const inquiry = await ContactInquiry.findByIdAndDelete(req.params.id)

    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' })
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (error) {
    console.error('Failed to delete contact inquiry:', error)

    res.status(500).json({ success: false, message: 'Failed to delete inquiry' })
  }
})

// Delete several inquiries at once: only the ids sent are removed.
const MAX_BULK_DELETE = 500

router.post('/bulk-delete', requireAdmin, async (req, res) => {
  try {
    const ids = req.body?.ids

    if (
      !Array.isArray(ids) ||
      ids.length === 0 ||
      ids.length > MAX_BULK_DELETE ||
      !ids.every((id) => typeof id === 'string' && mongoose.isValidObjectId(id))
    ) {
      return res.status(400).json({
        success: false,
        message: `Send between 1 and ${MAX_BULK_DELETE} valid inquiry ids`,
      })
    }

    const result = await ContactInquiry.deleteMany({ _id: { $in: ids } })

    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} inquiries deleted successfully`,
    })
  } catch (error) {
    console.error('Failed to bulk delete contact inquiries:', error)

    res.status(500).json({ success: false, message: 'Failed to delete inquiries' })
  }
})

export default router
