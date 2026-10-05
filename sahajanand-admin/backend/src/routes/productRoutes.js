import express from 'express'
import Product from '../models/Product.js'
import upload from '../middleware/upload.js'
import mongoose from 'mongoose'

const router = express.Router()

// "1M+" -> 1000000 (lower bound of the range), so the hero "Downloads" total works from the typed values
const downloadsToNumber = (text) => {
  const match = /^(\d+(?:\.\d+)?)\s*([KMB]?)\+?(?:\s*downloads)?$/i.exec(String(text || '').trim())

  if (!match) return 0

  const unit = { K: 1e3, M: 1e6, B: 1e9 }[match[2].toUpperCase()] || 1

  return Math.round(Number(match[1]) * unit)
}

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    })

    res.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
    })
  }
})

// Live stats for the /our-product hero cards
router.get('/stats', async (req, res) => {
  try {
    const products = await Product.find().select(
      'downloads downloadCount rating ratingCount countries',
    )

    let downloads = 0
    let ratingTotal = 0
    let ratingVotes = 0
    const countries = new Set()

    products.forEach((product) => {
      downloads += downloadsToNumber(product.downloads) || product.downloadCount || 0

      if (product.ratingCount > 0 && product.rating > 0) {
        ratingTotal += product.rating * product.ratingCount
        ratingVotes += product.ratingCount
      }

      ;(product.countries || []).forEach((country) => {
        const key = country.trim().toLowerCase()
        if (key) countries.add(key)
      })
    })

    res.json({
      success: true,
      stats: {
        products: products.length,
        downloads,
        averageRating: ratingVotes
          ? Math.round((ratingTotal / ratingVotes) * 10) / 10
          : 0,
        countries: countries.size,
      },
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch product stats',
    })
  }
})

const toNumber = (value, max = Infinity) => {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.min(number, max) : 0
}

const toCountries = (value) =>
  typeof value === 'string'
    ? [...new Set(value.split(',').map((item) => item.trim()).filter(Boolean))]
    : []

// Add product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      downloads: req.body.downloads,
      rating: toNumber(req.body.rating, 5),
      ratingCount: Math.floor(toNumber(req.body.ratingCount)),
      countries: toCountries(req.body.countries),
      playStore: req.body.playStore,
      website: req.body.website,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : '',
    })

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add product',
    })
  }
})

// Edit product (image is replaced only when a new one is uploaded)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    const update = {}

    ;['name', 'description', 'playStore', 'downloads'].forEach((field) => {
      if (typeof req.body[field] === 'string') update[field] = req.body[field].trim()
    })

    if (update.name === '') {
      return res.status(400).json({
        success: false,
        message: 'Product name is required',
      })
    }

    if (req.file) {
      update.image = `/uploads/products/${req.file.filename}`
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true },
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update product',
    })
  }
})

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
    })
  }
})

export default router