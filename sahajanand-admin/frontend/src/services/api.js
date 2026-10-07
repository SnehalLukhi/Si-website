// Backend base URL used by every admin page.
// Empty by default: requests go to the same site (/api/...), which Vercel routes to the backend service
// and the Vite dev server proxies to the local backend. Set VITE_API_URL to point somewhere else.
export const API_URL = import.meta.env.VITE_API_URL ?? ''

// Uploaded images are stored either as full https URLs (Vercel Blob) or as /uploads/... paths on the backend
export const assetUrl = (path) => {
  if (!path) return ''
  return /^https?:\/\//.test(path) ? path : `${API_URL}${path}`
}
