import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import contactRoutes from './src/routes/contactRoutes.js'
import applicationRoutes from './src/routes/applicationRoutes.js'
import serviceInquiryRoutes from './src/routes/serviceInquiryRoutes.js'
import jobRoutes from './src/routes/jobRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import blogRoutes from './src/routes/blogRoutes.js'
import aiLabRoutes from './src/routes/aiLabRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import { getJwtSecret, protectReads, protectWrites } from './src/middleware/auth.js'

dotenv.config()

// Refuse to start without a login-token secret instead of falling back to an insecure default
getJwtSecret()

const app = express()

// Other projects on this machine also default to port 5000 and have their own /api/auth/login.
// This header lets the admin login page tell "wrong password" apart from "talking to a different server".
app.use((req, res, next) => {
  res.setHeader('X-Service', 'sahajanand-admin')
  next()
})

app.use(cors({ exposedHeaders: ['X-Service'] }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)

// Admin-only: stored contact submissions can be read only when logged in (the website's form still posts freely)
app.use('/api/contact', protectReads, contactRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/service-inquiries', serviceInquiryRoutes)

// Anyone can read these (the website does); adding, editing and deleting needs an admin login
app.use('/api/jobs', protectWrites, jobRoutes)
app.use('/api/products', protectWrites, productRoutes)
app.use('/api/blogs', protectWrites, blogRoutes)
app.use('/api/ai-lab', protectWrites, aiLabRoutes)

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
  })
  