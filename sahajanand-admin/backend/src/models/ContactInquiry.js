import mongoose from 'mongoose'

const contactInquirySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    countryCode: {
      type: String,
      trim: true,
      default: '',
    },

    phone: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
      default: '',
    },

    service: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    subject: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    attachment: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['New', 'Read', 'Replied', 'Closed'],
      default: 'New',
    },

    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },

    emailError: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model(
  'ContactInquiry',
  contactInquirySchema
)
