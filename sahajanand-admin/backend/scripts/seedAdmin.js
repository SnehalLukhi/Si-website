// Creates the first admin account. Run once, passing the credentials on the command line so the
// password is never stored in a file:
//
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='your-password' npm run seed-admin
//
// An existing admin is never changed (use "Forgot password" to change a password).
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../src/models/Admin.js'

const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD || ''

if (!email || !password) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD on the command line before running this.')
  process.exit(1)
}

await mongoose.connect(process.env.MONGODB_URI)

if (await Admin.exists({ email })) {
  console.log(`Admin ${email} already exists. Nothing was changed.`)
} else {
  await Admin.create({ email, passwordHash: await bcrypt.hash(password, 12) })
  console.log(`Admin ${email} created (password stored as a bcrypt hash).`)
}

await mongoose.disconnect()
