import express from 'express'
import multer from 'multer'
import ContactInquiry from '../models/ContactInquiry.js'
import { getMailFrom, getMailTo, getTransporter } from '../services/mailer.js'

const router = express.Router()
const allowedAttachments = new Map([
  ['.pdf', 'application/pdf'],
  ['.doc', 'application/msword'],
  ['.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
])

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 9,
    fieldSize: 100 * 1024,
  },
  fileFilter: (req, file, callback) => {
    const extension = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase()
    if (allowedAttachments.get(extension) === file.mimetype) {
      callback(null, true)
      return
    }

    callback(new Error('Only PDF, DOC, DOCX, PNG, JPG, and JPEG attachments are allowed'))
  },
})

const parseContactForm = (req, res, next) => {
  upload.single('attachment')(req, res, (error) => {
    if (!error) {
      next()
      return
    }

    if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
      res.status(413).json({
        success: false,
        message: 'Attachment must be 5 MB or smaller',
      })
      return
    }

    res.status(400).json({
      success: false,
      message:
        error instanceof multer.MulterError
          ? 'The uploaded form or attachment is invalid'
          : error.message,
    })
  })
}

router.post('/', parseContactForm, async (req, res) => {
  try {
    const form = Object.fromEntries(
      [
        'firstName',
        'lastName',
        'email',
        'phone',
        'service',
        'experience',
        'company',
        'subject',
        'message',
      ].map((field) => [
        field,
        typeof req.body[field] === 'string' ? req.body[field].trim() : '',
      ]),
    )
    const requiredFields = ['firstName', 'lastName', 'service', 'experience', 'message']
    if (requiredFields.some((field) => !form[field])) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields',
      })
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address',
      })
    }

    const inquiry = await ContactInquiry.create(form)

    await getTransporter().sendMail({
      from: getMailFrom(),
      to: getMailTo(),
      subject: (form.subject || `Contact form inquiry from ${form.firstName} ${form.lastName}`)
        .replace(/[\r\n]+/g, ' ')
        .trim(),
      text: [
        `First Name: ${form.firstName}`,
        `Last Name: ${form.lastName}`,
        `Phone: ${form.phone || 'Not provided'}`,
        `Service: ${form.service}`,
        `Experience: ${form.experience}`,
        `Company / Website: ${form.company || 'Not provided'}`,
        `Subject: ${form.subject || 'Not provided'}`,
        '',
        'Message:',
        form.message,
      ].join('\n'),
      attachments: req.file
        ? [
            {
              filename: req.file.originalname.split(/[\\/]/).pop(),
              content: req.file.buffer,
              contentType: req.file.mimetype,
            },
          ]
        : [],
    })

    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      inquiry,
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

export default router
