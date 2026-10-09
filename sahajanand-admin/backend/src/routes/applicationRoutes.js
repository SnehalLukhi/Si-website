import express from 'express'
import mongoose from 'mongoose'
import Job from '../models/Job.js'
import JobApplication from '../models/JobApplication.js'
import { sendWithResend } from '../services/resendMailer.js'

const router = express.Router()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COUNTRY_CODE_PATTERN = /^\+\d{1,4}$/

const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

// Optional: a link with or without https://. Returns '' for none, null for something that is not a web address.
const cleanLink = (value) => {
  if (!value) return ''

  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`)

    return url.hostname.includes('.') ? url.toString() : null
  } catch {
    return null
  }
}

router.post('/', async (req, res) => {
  try {
    const name = text(req.body.name, 100)
    const company = text(req.body.company, 150)
    const country = text(req.body.country, 100)
    const email = text(req.body.email, 254)
    const countryCode = text(req.body.countryCode, 6)
    const phone = text(req.body.phone, 30)
    const portfolio = cleanLink(text(req.body.portfolio, 300))
    const message = text(req.body.message, 5000)
    const jobId = text(req.body.jobId, 40)

    if (!name || !company || !country || !email || !phone || !jobId) {
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

    if (portfolio === null) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid portfolio or store link',
      })
    }

    // The job's title and category come from the database, so they are always accurate for that job
    const job = mongoose.isValidObjectId(jobId) ? await Job.findById(jobId) : null

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'This job is no longer available',
      })
    }

    // Saved before emailing, so nothing is lost if the email fails
    const application = await JobApplication.create({
      job: job._id,
      jobTitle: job.title,
      jobCategory: job.category || '',
      name,
      company,
      country,
      email,
      countryCode,
      phone,
      portfolio,
      message,
    })

    try {
      await sendWithResend({
        replyTo: email,
        subject: `New Job Application - ${job.title}`.replace(/[\r\n]+/g, ' ').trim(),
        text: [
          `Full Name: ${name}`,
          `Company Name: ${company}`,
          `Country: ${country}`,
          `Email: ${email}`,
          `Phone Number: ${countryCode} ${phone}`,
          `Portfolio / Store Link: ${portfolio || 'Not provided'}`,
          `Job Title: ${job.title}`,
          `Job Category: ${job.category || 'Not specified'}`,
          '',
          'Message:',
          message || 'Not provided',
        ].join('\n'),
      })
    } catch (emailError) {
      await JobApplication.findByIdAndUpdate(application._id, {
        emailStatus: 'failed',
        emailError: String(emailError?.message || emailError).slice(0, 500),
      }).catch(() => {})
      throw emailError
    }

    await JobApplication.findByIdAndUpdate(application._id, { emailStatus: 'sent' }).catch(() => {})

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
    })
  } catch (error) {
    console.error('Failed to send job application:', error)

    res.status(500).json({
      success: false,
      message: 'Unable to send your application right now. Please try again later.',
    })
  }
})

export default router
