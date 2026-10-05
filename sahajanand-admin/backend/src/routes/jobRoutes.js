import express from 'express'
import Job from '../models/Job.js'

const router = express.Router()

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      jobs,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
    })
  }
})

// Add new job
router.post('/', async (req, res) => {
  try {
    const job = await Job.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Job added successfully',
      job,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add job',
    })
  }
})

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      })
    }

    res.json({
      success: true,
      message: 'Job deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
    })
  }
})

export default router