import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'Full Time',
    },
    location: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    requirements: {
      type: String,
      default: '',
    },
    benefits: {
      type: String,
      default: '',
    },
    expirationDate: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Job', jobSchema)