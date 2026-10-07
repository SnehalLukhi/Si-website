import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import Job from '../models/Job.js'
import { sendWithResend } from '../services/resendMailer.js'

const router = express.Router()

// Same CV types the Apply form accepts; the extension and the MIME type must both match
const allowedCvTypes = new Map([
  ['.pdf', 'application/pdf'],
  ['.doc', 'application/msword'],
  ['.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
])

// The CV stays in memory and is only attached to the email; nothing is written to disk or the database
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 8,
    fieldSize: 100 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const extension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase()
    if (allowedCvTypes.get(extension) === file.mimetype) {
      callback(null, true)
      return
    }

    callback(new Error('Only PDF, DOC, DOCX, PNG, JPG, and JPEG files are allowed'))
  },
})

const parseApplication = (req, res, next) => {
  upload.single('cv')(req, res, (error) => {
    if (!error) {
      next()
      return
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: false,
        message: 'CV must be 5 MB or smaller',
      })
      return
    }

    res.status(400).json({
      success: false,
      message:
        error instanceof multer.MulterError
          ? 'The uploaded form or CV is invalid'
          : error.message,
    })
  })
}

const text = (value) => (typeof value === 'string' ? value.trim() : '')

router.post('/', parseApplication, async (req, res) => {
  try {
    const name = text(req.body.name)
    const email = text(req.body.email)
    const phone = text(req.body.phone)
    const countryCode = text(req.body.countryCode)
    const coverLetter = text(req.body.coverLetter)
    const jobId = text(req.body.jobId)

    if (!name || !email || !phone || !req.file || !jobId) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields and upload your CV',
      })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
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

    await sendWithResend({
      replyTo: email,
      subject: `New Job Application - ${job.title}`.replace(/[\r\n]+/g, ' ').trim(),
      text: [
        `Applicant Name: ${name}`,
        `Applicant Email: ${email}`,
        `Applicant Phone: ${[countryCode, phone].filter(Boolean).join(' ')}`,
        `Job Title: ${job.title}`,
        `Job Category: ${job.category || 'Not specified'}`,
        '',
        'Cover Letter:',
        coverLetter || 'Not provided',
      ].join('\n'),
      attachments: [
        {
          filename: req.file.originalname.split(/[\\/]/).pop(),
          content: req.file.buffer,
        },
      ],
    })

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
