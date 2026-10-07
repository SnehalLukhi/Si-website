import express from 'express'
import mongoose from 'mongoose'
import Blog from '../models/Blog.js'
import { blogImages, removeBlogImage } from '../middleware/uploadBlog.js'

const router = express.Router()

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const toSlug = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// sections arrive as a JSON string in the multipart form
const toSections = (value) => {
  let list = value

  if (typeof list === 'string') {
    try {
      list = JSON.parse(list)
    } catch {
      return []
    }
  }

  if (!Array.isArray(list)) return []

  return list
    .map((section) => ({
      heading: String(section?.heading || '').trim(),
      content: String(section?.content || '').trim(),
      bullets: (Array.isArray(section?.bullets) ? section.bullets : [])
        .map((item) => String(item).trim())
        .filter(Boolean),
    }))
    .filter((section) => section.heading || section.content || section.bullets.length)
}

const text = (value) => (typeof value === 'string' ? value.trim() : '')

const cleanupUploads = (files) => {
  Object.values(files || {})
    .flat()
    .forEach((file) => removeBlogImage(file.url))
}

// Get all blogs (newest first)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 })

    res.json({ success: true, blogs })
  } catch (error) {
    console.error(error)

    res.status(500).json({ success: false, message: 'Failed to fetch blogs' })
  }
})

// Get one blog by its slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: String(req.params.slug).toLowerCase() })

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    res.json({ success: true, blog })
  } catch (error) {
    console.error(error)

    res.status(500).json({ success: false, message: 'Failed to fetch blog' })
  }
})

// Add blog
router.post('/', blogImages, async (req, res) => {
  try {
    const title = text(req.body.title)
    const slug = toSlug(req.body.slug || title)

    if (!title) {
      cleanupUploads(req.files)
      return res.status(400).json({ success: false, message: 'Blog title is required' })
    }

    if (!SLUG_PATTERN.test(slug)) {
      cleanupUploads(req.files)
      return res.status(400).json({ success: false, message: 'Slug is invalid' })
    }

    if (await Blog.exists({ slug })) {
      cleanupUploads(req.files)
      return res.status(409).json({ success: false, message: 'This slug is already used' })
    }

    const image = req.files?.image?.[0]
    const articleImage = req.files?.articleImage?.[0]

    const blog = await Blog.create({
      title,
      slug,
      date: text(req.body.date),
      excerpt: text(req.body.excerpt),
      image: image ? image.url : '',
      articleImage: articleImage ? articleImage.url : '',
      articleHeading: text(req.body.articleHeading),
      sections: toSections(req.body.sections),
    })

    res.status(201).json({ success: true, message: 'Blog added successfully', blog })
  } catch (error) {
    console.error(error)
    cleanupUploads(req.files)

    res.status(500).json({ success: false, message: 'Failed to add blog' })
  }
})

// Edit blog (the slug only changes when a different one is sent; images only when a new file is uploaded)
router.put('/:id', blogImages, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      cleanupUploads(req.files)
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      cleanupUploads(req.files)
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const title = typeof req.body.title === 'string' ? req.body.title.trim() : blog.title

    if (!title) {
      cleanupUploads(req.files)
      return res.status(400).json({ success: false, message: 'Blog title is required' })
    }

    const slug =
      typeof req.body.slug === 'string' && req.body.slug.trim()
        ? toSlug(req.body.slug)
        : blog.slug

    if (!SLUG_PATTERN.test(slug)) {
      cleanupUploads(req.files)
      return res.status(400).json({ success: false, message: 'Slug is invalid' })
    }

    if (slug !== blog.slug && (await Blog.exists({ slug, _id: { $ne: blog._id } }))) {
      cleanupUploads(req.files)
      return res.status(409).json({ success: false, message: 'This slug is already used' })
    }

    const oldImages = []
    const image = req.files?.image?.[0]
    const articleImage = req.files?.articleImage?.[0]

    blog.title = title
    blog.slug = slug

    if (typeof req.body.date === 'string') blog.date = req.body.date.trim()
    if (typeof req.body.excerpt === 'string') blog.excerpt = req.body.excerpt.trim()
    if (typeof req.body.articleHeading === 'string') {
      blog.articleHeading = req.body.articleHeading.trim()
    }
    if (req.body.sections !== undefined) blog.sections = toSections(req.body.sections)

    if (image) {
      oldImages.push(blog.image)
      blog.image = image.url
    }

    if (articleImage) {
      oldImages.push(blog.articleImage)
      blog.articleImage = articleImage.url
    }

    await blog.save()
    oldImages.forEach(removeBlogImage)

    res.json({ success: true, message: 'Blog updated successfully', blog })
  } catch (error) {
    console.error(error)
    cleanupUploads(req.files)

    res.status(500).json({ success: false, message: 'Failed to update blog' })
  }
})

// Delete blog
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    removeBlogImage(blog.image)
    removeBlogImage(blog.articleImage)

    res.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    console.error(error)

    res.status(500).json({ success: false, message: 'Failed to delete blog' })
  }
})

export default router
