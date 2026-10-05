import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

const TOKEN_LIFETIME = '12h'

// The signing secret comes from .env only; there is deliberately no fallback value
export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET

  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be set in .env (at least 32 characters)')
  }

  return secret
}

// Stateless token: any number of devices can be logged in with the same account at once
export const signToken = (admin) =>
  jwt.sign({ sub: String(admin._id), jti: crypto.randomUUID() }, getJwtSecret(), {
    algorithm: 'HS256',
    expiresIn: TOKEN_LIFETIME,
  })

const unauthorized = (res, message = 'Please log in to continue') =>
  res.status(401).json({ success: false, message })

export const requireAdmin = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''

    if (!token) return unauthorized(res)

    let decoded

    try {
      decoded = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] })
    } catch {
      return unauthorized(res, 'Your session has expired. Please log in again')
    }

    const admin = await Admin.findById(decoded.sub)

    if (!admin) return unauthorized(res)

    // A password reset signs everyone out: tokens issued before it are rejected
    if (
      admin.passwordChangedAt &&
      decoded.iat < Math.floor(admin.passwordChangedAt.getTime() / 1000)
    ) {
      return unauthorized(res, 'Your session has expired. Please log in again')
    }

    req.admin = admin
    next()
  } catch (error) {
    console.error('Authentication check failed:', error)

    res.status(500).json({ success: false, message: 'Authentication check failed' })
  }
}

// Write requests need a login; reads stay public (the website reads jobs, products and AI Lab)
export const protectWrites = (req, res, next) =>
  ['GET', 'HEAD', 'OPTIONS'].includes(req.method) ? next() : requireAdmin(req, res, next)

// The reverse: submitting stays public (website forms), reading the stored submissions needs a login
export const protectReads = (req, res, next) =>
  req.method === 'GET' ? requireAdmin(req, res, next) : next()
