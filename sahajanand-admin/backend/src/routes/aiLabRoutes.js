import express from 'express'
import AiLab from '../models/AiLab.js'
import upload from '../middleware/upload.js'

const router = express.Router()

// Get all AI Lab items
router.get('/', async (req, res) => {
  try {
    const aiLabs = await AiLab.find().sort({
      createdAt: -1,
    })

    res.json({
      success: true,
      aiLabs,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch AI Lab items',
    })
  }
})

// Add AI Lab item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const aiLab = await AiLab.create({
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : '',
    })

    res.status(201).json({
      success: true,
      message: 'AI Lab item added successfully',
      aiLab,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add AI Lab item',
    })
  }
})

// Delete AI Lab item
router.delete('/:id', async (req, res) => {
  try {
    const aiLab = await AiLab.findByIdAndDelete(req.params.id)

    if (!aiLab) {
      return res.status(404).json({
        success: false,
        message: 'AI Lab item not found',
      })
    }

    res.json({
      success: true,
      message: 'AI Lab item deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete AI Lab item',
    })
  }
})

export default router