import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { put, del } from '@vercel/blob'

// With BLOB_READ_WRITE_TOKEN set (Vercel) images go to Vercel Blob and are stored as full https URLs.
// Without it (local development) they are written to ./uploads and stored as /uploads/<folder>/<file>.
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

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

const saveFile = async (file, folder) => {
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`

  if (useBlob()) {
    const blob = await put(`${folder}/${filename}`, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    })
    file.url = blob.url
  } else {
    const dir = path.join('uploads', folder)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, filename), file.buffer)
    file.url = `/uploads/${folder}/${filename}`
  }

  file.filename = filename
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

// Removes a stored image (a Blob URL or a local /uploads path); never throws
export const removeImage = (imagePath) => {
  if (typeof imagePath !== 'string' || !imagePath) return

  if (/^https?:\/\//.test(imagePath)) {
    if (useBlob()) del(imagePath).catch(() => {})
    return
  }

  if (!process.env.VERCEL && imagePath.startsWith('/uploads/') && !imagePath.includes('..')) {
    fs.unlink(path.join('.', imagePath), () => {})
  }
}
