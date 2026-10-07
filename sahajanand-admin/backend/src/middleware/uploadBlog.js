import multer from 'multer'
import path from 'path'
import fs from 'fs'

export const BLOG_UPLOAD_DIR = 'uploads/blogs'

if (!fs.existsSync(BLOG_UPLOAD_DIR)) {
  fs.mkdirSync(BLOG_UPLOAD_DIR, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, BLOG_UPLOAD_DIR),
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`)
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'))
  }
}

const uploadBlog = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

// Card image + detail/article image
export const blogImages = uploadBlog.fields([
  { name: 'image', maxCount: 1 },
  { name: 'articleImage', maxCount: 1 },
])

// Removes a stored blog image (ignores anything outside the blog upload folder)
export const removeBlogImage = (imagePath) => {
  if (typeof imagePath !== 'string' || !imagePath.startsWith('/uploads/blogs/')) return

  fs.unlink(path.join(BLOG_UPLOAD_DIR, path.basename(imagePath)), () => {})
}
