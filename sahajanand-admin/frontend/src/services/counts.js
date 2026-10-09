import { API_URL } from './api'
import { authFetch } from './auth'

const COUNTS_EVENT = 'sahajanand-admin-counts-changed'

// Sidebar counts come from the real records (GET /api/stats/counts); null until they have loaded
export const fetchCounts = async () => {
  try {
    const response = await authFetch(`${API_URL}/api/stats/counts`)
    const data = await response.json()

    if (!response.ok || !data.success) return null

    return { jobApplications: data.jobApplications, contactInquiries: data.contactInquiries }
  } catch {
    return null
  }
}

// Called after a delete so the sidebar numbers update straight away
export const refreshCounts = () => window.dispatchEvent(new Event(COUNTS_EVENT))

export const onCountsChanged = (callback) => {
  window.addEventListener(COUNTS_EVENT, callback)

  return () => window.removeEventListener(COUNTS_EVENT, callback)
}
