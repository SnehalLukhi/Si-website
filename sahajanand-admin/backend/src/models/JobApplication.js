import mongoose from 'mongoose'

// Kept as a safety copy of what was emailed; not shown in the admin panel
const jobApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    jobTitle: { type: String, trim: true, default: '' },
    jobCategory: { type: String, trim: true, default: '' },
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    countryCode: { type: String, trim: true, default: '' },
    phone: { type: String, required: true, trim: true },
    portfolio: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    emailStatus: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
    emailError: { type: String, default: '' },
  },
  { timestamps: true },
)

export default mongoose.model('JobApplication', jobApplicationSchema)
