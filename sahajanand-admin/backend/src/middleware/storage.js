import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

// With Cloudinary configured (CLOUDINARY_URL, or CLOUDINARY_CLOUD_NAME + CLOUDINARY_API_KEY + CLOUDINARY_API_SECRET)
// images go to Cloudinary and are stored in the database as full https URLs.
// Without it (plain local development) they are written to ./uploads and stored as /uploads/<folder>/<file>.
const CLOUDINARY_ROOT_FOLDER = 'sahajanand'

const useCloudinary = () =>
  Boolean(
    process.env.CLOUDINARY_URL ||
      (process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET),
  )

// CLOUDINARY_URL is read by the SDK on its own; the three separate variables are applied here
if (!process.env.CLOUDINARY_URL && process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'))
  }
}

const multerInstance = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

const uploadToCloudinary = (buffer, folder, publicId) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${CLOUDINARY_ROOT_FOLDER}/${folder}`, public_id: publicId, resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve(result)),
    )
    stream.end(buffer)
  })

// Delivered through Cloudinary's CDN in the best format and quality for each browser (smaller downloads)
const optimizedUrl = (secureUrl) => secureUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto/')

const saveFile = async (file, folder) => {
  const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}`

  if (useCloudinary()) {
    const result = await uploadToCloudinary(file.buffer, folder, name)
    file.url = optimizedUrl(result.secure_url)
    file.filename = name
  } else {
    const filename = `${name}${path.extname(file.originalname)}`
    const dir = path.join('uploads', folder)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, filename), file.buffer)
    file.url = `/uploads/${folder}/${filename}`
    file.filename = filename
  }

  delete file.buffer
}

// Runs after multer: stores every received file and puts its public address on file.url
const persist = (folder) => async (req, res, next) => {
  try {
    const files = req.file ? [req.file] : Object.values(req.files || {}).flat()
    await Promise.all(files.map((file) => saveFile(file, folder)))
    next()
  } catch (error) {
    next(error)
  }
}

export const createUploader = (folder) => ({
  single: (field) => [multerInstance.single(field), persist(folder)],
  fields: (fields) => [multerInstance.fields(fields), persist(folder)],
})

// "https://res.cloudinary.com/<cloud>/image/upload/f_auto,q_auto/v123/sahajanand/blogs/abc.jpg" -> "sahajanand/blogs/abc"
export const cloudinaryPublicId = (url) => {
  const match = /^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(?:.*\/)?v\d+\/(.+?)(?:\.[A-Za-z0-9]+)?$/.exec(url)
  return match ? match[1] : null
}

// Removes a stored image (a Cloudinary URL or a local /uploads path); never throws
export const removeImage = (imagePath) => {
  if (typeof imagePath !== 'string' || !imagePath) return

  if (/^https?:\/\//.test(imagePath)) {
    const publicId = cloudinaryPublicId(imagePath)
    if (publicId && useCloudinary()) cloudinary.uploader.destroy(publicId, { resource_type: 'image' }).catch(() => {})
    return
  }

  if (!process.env.VERCEL && imagePath.startsWith('/uploads/') && !imagePath.includes('..')) {
    fs.unlink(path.join('.', imagePath), () => {})
  }
}
