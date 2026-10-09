import multer from 'multer'

// Unknown /api paths answer with JSON, not an HTML page
export const apiNotFound = (req, res, next) => {
  if (!req.path.startsWith('/api')) return next()
  res.status(404).json({ success: false, message: 'Not found' })
}

// Every error (including the ones thrown by the image upload step, which runs before a route's own try/catch)
// answers with JSON, so the admin app can show the message instead of failing to parse an HTML error page
// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    const message =
      error.code === 'LIMIT_FILE_SIZE' ? 'Each image must be 5 MB or smaller' : `Upload error: ${error.message}`
    return res.status(400).json({ success: false, message })
  }

  if (error?.message === 'Only image files are allowed') {
    return res.status(400).json({ success: false, message: error.message })
  }

  console.error(error)

  const status = error?.status || error?.statusCode || 500
  res.status(status >= 400 && status < 600 ? status : 500).json({
    success: false,
    message: error?.publicMessage || 'Something went wrong on the server',
  })
}
