import { useRef, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL ?? ''
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// "Let's Get In Touch" form on the service pages: validates, emails the message, reports the result.
// `service` names the page the message came from (e.g. 'QA Tester').
export function useServiceInquiry(service) {
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const submittingRef = useRef(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    // ignore repeat clicks while a message is already being sent
    if (submittingRef.current) return

    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const payload = {
      name: String(values.name || '').trim(),
      email: String(values.email || '').trim(),
      subject: String(values.subject || '').trim(),
      message: String(values.message || '').trim(),
      service,
    }

    if (!payload.name || !payload.email || !payload.message) {
      setStatus({ type: 'error', message: 'Please fill in your name, email and message.' })
      return
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' })
      return
    }

    submittingRef.current = true
    setSubmitting(true)
    setStatus({ type: 'pending', message: 'Sending your message...' })

    try {
      const response = await fetch(`${API_URL}/api/service-inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        setStatus({
          type: 'error',
          message: result?.message || 'Unable to send your message. Please try again.',
        })
        return
      }

      form.reset()
      setStatus({ type: 'success', message: result.message || 'Your message has been sent successfully.' })
    } catch (error) {
      console.error('Service page message failed:', error)
      setStatus({ type: 'error', message: 'Unable to send your message. Please try again.' })
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  return { handleSubmit, status, submitting }
}
