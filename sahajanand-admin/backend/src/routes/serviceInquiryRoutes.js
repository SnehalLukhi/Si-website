import express from 'express'
import { sendWithResend } from '../services/resendMailer.js'

const router = express.Router()

// The service pages that carry the "Let's Get In Touch" form (anything else is ignored)
const SERVICE_PAGES = ['UI/UX Design', 'QA Tester', 'Web Development', 'App Development', 'Marketing']

const text = (value, max) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

// Nothing is saved: the message is only emailed through Resend
router.post('/', async (req, res) => {
  try {
    const name = text(req.body.name, 100)
    const email = text(req.body.email, 254)
    const subject = text(req.body.subject, 200)
    const message = text(req.body.message, 5000)
    const service = SERVICE_PAGES.includes(req.body.service) ? req.body.service : ''

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in your name, email and message',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      })
    }

    await sendWithResend({
      replyTo: email,
      subject: `${service ? `[${service}] ` : ''}${subject || `New message from ${name}`}`
        .replace(/[\r\n]+/g, ' ')
        .trim(),
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject || 'Not provided'}`,
        ...(service ? [`Service Page: ${service}`] : []),
        '',
        'Message:',
        message,
      ].join('\n'),
    })

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully',
    })
  } catch (error) {
    console.error('Failed to send service page message:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    })
  }
})

export default router
