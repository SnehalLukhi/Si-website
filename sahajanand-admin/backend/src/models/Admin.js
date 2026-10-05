import mongoose from 'mongoose'

// Admin panel account. The password is only ever stored as a bcrypt hash.
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    // Logins issued before this moment are no longer accepted (set when the password is reset)
    passwordChangedAt: {
      type: Date,
    },

    // Only a SHA-256 hash of the emailed reset token is stored, never the token itself
    resetTokenHash: {
      type: String,
      select: false,
    },

    resetTokenExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Admin', adminSchema)
