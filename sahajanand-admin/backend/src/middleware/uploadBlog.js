import { createUploader, removeImage } from './storage.js'

export const BLOG_UPLOAD_DIR = 'uploads/blogs'

const uploadBlog = createUploader('blogs')

// Card image + detail/article image
export const blogImages = uploadBlog.fields([
  { name: 'image', maxCount: 1 },
  { name: 'articleImage', maxCount: 1 },
])

// Removes a stored blog image
export const removeBlogImage = removeImage
