import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'
import ContactInquiry from '../models/ContactInquiry.js'
import { sendWithResend } from '../services/resendMailer.js'
import { requireAdmin } from '../middleware/auth.js'

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

    const inquiry = await ContactInquiry.create({
      ...form,
      // Only the file name is stored (the file itself is emailed, not kept)
      attachment: req.file ? req.file.originalname.split(/[\\/]/).pop() : '',
    })

    // The inquiry is already saved; if Resend fails the record stays and the error is logged by the catch below
    const subjectLine = (form.subject || `${form.firstName} ${form.lastName}`)
      .replace(/[\r\n]+/g, ' ')
      .trim()

    await sendWithResend({
      subject: `New Contact Us Inquiry - ${subjectLine}`,
      // Replying to the notification goes straight to the visitor
      replyTo: form.email || undefined,
      text: [
        'New Contact Us Inquiry',
        '',
        `First Name: ${form.firstName}`,
        `Last Name: ${form.lastName}`,
        `Email: ${form.email || 'Not provided'}`,
        `Phone: ${form.phone || 'Not provided'}`,
        `Service: ${form.service}`,
        `Experience: ${form.experience}`,
        `Company: ${form.company || 'Not provided'}`,
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
