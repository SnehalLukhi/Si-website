import { Fragment, useEffect, useState } from 'react'
import { SearchIcon, TrashIcon } from '../../components/Icons'
import { API_URL } from '../../services/api'
import { authFetch } from '../../services/auth'
import { refreshCounts } from '../../services/counts'

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : '—'

const fullName = (inquiry) => [inquiry.firstName, inquiry.lastName].filter(Boolean).join(' ')

const phoneOf = (inquiry) => [inquiry.countryCode, inquiry.phone].filter(Boolean).join(' ')

const emailStatusOf = (inquiry) =>
  inquiry.emailStatus === 'sent'
    ? 'Sent'
    : inquiry.emailStatus === 'failed'
      ? `Not delivered${inquiry.emailError ? ` (${inquiry.emailError})` : ''}`
      : 'Pending'

// The Contact Us form's fields first; fields only older inquiries have are shown when they exist
const detailsOf = (inquiry) => [
  ['Full Name', fullName(inquiry)],
  ['Company Name', inquiry.company],
  ['Country', inquiry.country],
  ['Email', inquiry.email],
  ['Phone Number', phoneOf(inquiry)],
  ['Portfolio / Store Link', inquiry.portfolio],
  ['Submitted', formatDate(inquiry.createdAt)],
  ['Notification Email', emailStatusOf(inquiry)],
  ...[
    ['LinkedIn', inquiry.linkedin],
    ['Service', inquiry.service],
    ['Experience', inquiry.experience],
    ['Subject', inquiry.subject],
    ['Attachment', inquiry.attachment ? `${inquiry.attachment} (sent with the email)` : ''],
  ].filter(([, value]) => value),
]

function ContactInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [selected, setSelected] = useState(() => new Set())
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await authFetch(`${API_URL}/api/contact`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch inquiries')
        }

        setInquiries(data.inquiries)
      } catch (error) {
        console.error('Failed to fetch contact inquiries:', error)
        alert('Failed to load contact inquiries. Please check the backend.')
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  const search = query.trim().toLowerCase()
  const visible = inquiries.filter((inquiry) =>
    [
      fullName(inquiry),
      inquiry.email,
      inquiry.phone,
      inquiry.company,
      inquiry.country,
      inquiry.portfolio,
      inquiry.service,
      inquiry.subject,
      inquiry.message,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search),
  )

  const visibleSelected = visible.filter((inquiry) => selected.has(inquiry._id))
  const allVisibleSelected = visible.length > 0 && visibleSelected.length === visible.length
  const someVisibleSelected = visibleSelected.length > 0 && !allVisibleSelected

  const toggleOne = (inquiryId) => {
    setSelected((current) => {
      const next = new Set(current)

      if (next.has(inquiryId)) next.delete(inquiryId)
      else next.add(inquiryId)

      return next
    })
  }

  // "Select All" works on the inquiries currently shown (so it respects the search)
  const toggleAllVisible = () => {
    setSelected((current) => {
      const next = new Set(current)

      if (allVisibleSelected) visible.forEach((inquiry) => next.delete(inquiry._id))
      else visible.forEach((inquiry) => next.add(inquiry._id))

      return next
    })
  }

  const removeFromList = (ids) => {
    const gone = new Set(ids)

    setInquiries((current) => current.filter((inquiry) => !gone.has(inquiry._id)))
    setSelected((current) => new Set([...current].filter((inquiryId) => !gone.has(inquiryId))))
    setOpenId((current) => (gone.has(current) ? null : current))
    refreshCounts()
  }

  const handleDeleteOne = async (inquiry) => {
    const confirmed = window.confirm(
      `Delete the inquiry from ${fullName(inquiry) || 'this visitor'}? This action cannot be undone.`,
    )

    if (!confirmed) return

    try {
      setDeleting(true)

      const response = await authFetch(`${API_URL}/api/contact/${inquiry._id}`, { method: 'DELETE' })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete inquiry')
      }

      removeFromList([inquiry._id])
    } catch (error) {
      console.error('Failed to delete contact inquiry:', error)
      alert('Failed to delete the inquiry. Please check the backend.')
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteSelected = async () => {
    const ids = [...selected]

    if (ids.length === 0) return

    const confirmed = window.confirm(
      `Delete ${ids.length} selected ${ids.length === 1 ? 'inquiry' : 'inquiries'}? This action cannot be undone.`,
    )

    if (!confirmed) return

    try {
      setDeleting(true)

      const response = await authFetch(`${API_URL}/api/contact/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete inquiries')
      }

      removeFromList(ids)
    } catch (error) {
      console.error('Failed to delete contact inquiries:', error)
      alert('Failed to delete the selected inquiries. Please check the backend.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>
            Contact Us Inquiries <span className="count-pill">{inquiries.length}</span>
          </h1>
          <p>Messages sent from the website Contact Us form</p>
        </div>
      </div>

      <div className="toolbar">
        <label className="search-box">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, company, country or email"
            aria-label="Search contact inquiries"
          />
        </label>

        {/* Phones and small tablets show the rows as cards (no table header), so Select All is repeated here */}
        <label className="inquiry-select-all-compact">
          <input
            type="checkbox"
            className="inquiry-checkbox"
            checked={allVisibleSelected}
            ref={(node) => {
              if (node) node.indeterminate = someVisibleSelected
            }}
            onChange={toggleAllVisible}
            disabled={visible.length === 0 || deleting}
          />
          Select all
        </label>

        {selected.size > 0 && (
          <div className="inquiry-bulk">
            <span className="inquiry-bulk-count">{selected.size} selected</span>
            <button
              type="button"
              className="delete-job-btn"
              onClick={handleDeleteSelected}
              disabled={deleting}
            >
              <TrashIcon />
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <div className="data-card">
        <table className="data-table inquiry-table">
          <thead>
            <tr>
              <th className="inquiry-select">
                <input
                  type="checkbox"
                  className="inquiry-checkbox"
                  aria-label="Select all contact inquiries"
                  checked={allVisibleSelected}
                  ref={(node) => {
                    if (node) node.indeterminate = someVisibleSelected
                  }}
                  onChange={toggleAllVisible}
                  disabled={visible.length === 0 || deleting}
                />
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="table-message">
                <td colSpan="7">
                  <p>Loading contact inquiries...</p>
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr className="table-message">
                <td colSpan="7">
                  <h3>No inquiries yet</h3>
                  <p>Submissions from the Contact Us form will appear here.</p>
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr className="table-message">
                <td colSpan="7">
                  <h3>No matching inquiries</h3>
                  <p>Try a different search term.</p>
                </td>
              </tr>
            ) : (
              visible.map((inquiry) => {
                const open = openId === inquiry._id
                const isSelected = selected.has(inquiry._id)

                return (
                  <Fragment key={inquiry._id}>
                    <tr className={isSelected ? 'is-selected' : undefined}>
                      <td className="inquiry-select" data-label="Select">
                        <input
                          type="checkbox"
                          className="inquiry-checkbox"
                          aria-label={`Select the inquiry from ${fullName(inquiry)}`}
                          checked={isSelected}
                          onChange={() => toggleOne(inquiry._id)}
                          disabled={deleting}
                        />
                      </td>
                      <td data-label="Name">
                        <div className="cell-title">{fullName(inquiry)}</div>
                      </td>
                      <td data-label="Company">{inquiry.company || '—'}</td>
                      <td data-label="Contact">
                        <div className="inquiry-contact">
                          <span>{inquiry.email || '—'}</span>
                          {inquiry.phone && <span>{phoneOf(inquiry)}</span>}
                        </div>
                      </td>
                      <td data-label="Country">{inquiry.country || '—'}</td>
                      <td data-label="Submitted">{formatDate(inquiry.createdAt)}</td>
                      <td className="cell-actions inquiry-actions">
                        <button
                          type="button"
                          className="inquiry-view-btn"
                          aria-expanded={open}
                          onClick={() => setOpenId(open ? null : inquiry._id)}
                        >
                          {open ? 'Hide' : 'View'}
                        </button>
                        <button
                          type="button"
                          className="delete-job-btn"
                          onClick={() => handleDeleteOne(inquiry)}
                          disabled={deleting}
                        >
                          <TrashIcon />
                          Delete
                        </button>
                      </td>
                    </tr>

                    {open && (
                      <tr className="inquiry-detail-row">
                        <td colSpan="7">
                          <dl className="inquiry-detail-grid">
                            {detailsOf(inquiry).map(([label, value]) => (
                              <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value || '—'}</dd>
                              </div>
                            ))}
                          </dl>

                          <div className="inquiry-message">
                            <h4>Message</h4>
                            <p>{inquiry.message || 'Not provided'}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactInquiries
