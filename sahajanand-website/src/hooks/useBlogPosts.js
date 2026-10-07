import { useEffect, useState } from 'react'
import { fetchBlogs, toCardPost } from '../utils/blogApi'

/* Blog cards for Home and /blog, loaded from the admin-managed blogs.
   They are loaded again whenever the tab is shown or focused again, so a blog added, edited or deleted in
   Admin appears without a manual page refresh. */
export function useBlogPosts() {
  const [state, setState] = useState({ posts: [], loading: true })

  useEffect(() => {
    let controller = new AbortController()

    const load = () => {
      controller.abort()
      controller = new AbortController()

      fetchBlogs(controller.signal)
        .then((blogs) => setState({ posts: blogs.map(toCardPost), loading: false }))
        .catch((error) => {
          if (error.name === 'AbortError') return

          console.error('Failed to load blogs:', error)
          // Keep the cards that are already shown if a refresh fails
          setState((current) => ({ ...current, loading: false }))
        })
    }

    const onVisible = () => {
      if (document.visibilityState === 'visible') load()
    }

    load()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', load)

    return () => {
      controller.abort()
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', load)
    }
  }, [])

  return state
}
