/* Blog data lives in the admin backend (managed from Admin → Blogs). Home, /blog and the
   detail pages all read it through these helpers. */
export const API_URL = import.meta.env.VITE_API_URL ?? ''

/* "2026-01-16" -> "January 16, 2026" (any other text is shown as typed) */
export function formatBlogDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '')
  if (!match) return value || ''

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' },
  )
}

/* Images are full https URLs (Vercel Blob) or /uploads/... paths served by the backend */
export const blogImageUrl = (path) => {
  if (!path) return ''
  return /^https?:\/\//.test(path) ? path : `${API_URL}${path}`
}

/* The shape the shared BlogCard renders */
export function toCardPost(blog) {
  return {
    id: blog._id,
    title: blog.title,
    date: formatBlogDate(blog.date),
    excerpt: blog.excerpt,
    image: blogImageUrl(blog.image),
    href: `/blog/${blog.slug}`,
  }
}

export async function fetchBlogs(signal) {
  const response = await fetch(`${API_URL}/api/blogs`, { signal, cache: 'no-store' })
  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch blogs')
  }

  return Array.isArray(data.blogs) ? data.blogs : []
}

/* Resolves to the blog, or null when the slug does not exist (deleted / never created) */
export async function fetchBlogBySlug(slug, signal) {
  const response = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, { signal, cache: 'no-store' })

  if (response.status === 404) return null

  const data = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Failed to fetch blog')
  }

  return data.blog
}
