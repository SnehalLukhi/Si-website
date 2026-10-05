const COLORS = {
  success: '#15803d',
  error: '#b91c1c',
  pending: '#475569',
}

// Result line shown under the "Send Your Message" button
function ServiceFormStatus({ status }) {
  if (!status) return null

  return (
    <p
      role={status.type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      style={{ margin: 0, fontSize: '0.9rem', textAlign: 'center', color: COLORS[status.type] }}
    >
      {status.message}
    </p>
  )
}

export default ServiceFormStatus
