import { Fragment, useEffect, useState } from 'react'
import { DownloadIcon, SearchIcon, TrashIcon } from '../../components/Icons'
import { API_URL } from '../../services/api'
import { authFetch } from '../../services/auth'
import { refreshCounts } from '../../services/counts'

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    : '—'

const formatSize = (bytes) => {
  if (!bytes) return ''

  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const phoneOf = (application) =>
  [application.countryCode, application.phone].filter(Boolean).join(' ')

const emailStatusOf = (application) =>
  application.emailStatus === 'sent'
    ? 'Sent'
    : application.emailStatus === 'failed'
      ? `Not delivered${application.emailError ? ` (${application.emailError})` : ''}`
      : 'Pending'

const detailsOf = (application) => [
  ['Applicant Name', application.name],
  ['Email', application.email],
  ['Phone', phoneOf(application)],
  ['Job Title', application.jobTitle],
  ['Job ID', application.job],
  ['Job Category', application.jobCategory],
  ['Submitted', formatDate(application.createdAt)],
  ['Notification Email', emailStatusOf(application)],
]

function JobApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const [selected, setSelected] = useState(() => new Set())
  const [deleting, setDeleting] = useState(false)
  const [downloadingId, setDownloadingId] = useState(null)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await authFetch(`${API_URL}/api/applications`)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to fetch applications')
        }

        setApplications(data.applications)
      } catch (error) {
        console.error('Failed to fetch job applications:', error)
        alert('Failed to load job applications. Please check the backend.')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const search = query.trim().toLowerCase()
  const visible = applications.filter((application) =>
    [
      application.name,
      application.email,
      application.phone,
      application.jobTitle,
      application.jobCategory,
      application.job,
      application.coverLetter,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search),
  )

  const visibleSelected = visible.filter((application) => selected.has(application._id))
  const allVisibleSelected = visible.length > 0 && visibleSelected.length === visible.length
  const someVisibleSelected = visibleSelected.length > 0 && !allVisibleSelected

  const toggleOne = (applicationId) => {
    setSelected((current) => {
      const next = new Set(current)

      if (next.has(applicationId)) next.delete(applicationId)
      else next.add(applicationId)

      return next
    })
  }

  const toggleAllVisible = () => {
    setSelected((current) => {
      const next = new Set(current)

      if (allVisibleSelected) visible.forEach((application) => next.delete(application._id))
      else visible.forEach((application) => next.add(application._id))

      return next
    })
  }

  const removeFromList = (ids) => {
    const gone = new Set(ids)

    setApplications((current) => current.filter((application) => !gone.has(application._id)))
    setSelected((current) => new Set([...current].filter((applicationId) => !gone.has(applicationId))))
    setOpenId((current) => (gone.has(current) ? null : current))
    refreshCounts()
  }

  const handleDownloadCv = async (application) => {
    try {
      setDownloadingId(application._id)

      const response = await authFetch(`${API_URL}/api/applications/${application._id}/cv`)

      if (!response.ok) {
        throw new Error('Failed to download CV')
      }

      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')

      link.href = url
      link.download = application.cvFileName || 'cv'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download CV:', error)
      alert('Failed to download the CV. Please check the backend.')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDeleteOne = async (application) => {
    const confirmed = window.confirm(
      `Delete the application from ${application.name || 'this applicant'}? This action cannot be undone.`,
    )

    if (!confirmed) return

    try {
      setDeleting(true)

      const response = await authFetch(`${API_URL}/api/applications/${application._id}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete application')
      }

      removeFromList([application._id])
    } catch (error) {
      console.error('Failed to delete job application:', error)
      alert('Failed to delete the application. Please check the backend.')
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteSelected = async () => {
    const ids = [...selected]

    if (ids.length === 0) return

    const confirmed = window.confirm(
      `Delete ${ids.length} selected ${ids.length === 1 ? 'application' : 'applications'}? This action cannot be undone.`,
    )

    if (!confirmed) return

    try {
      setDeleting(true)

      const response = await authFetch(`${API_URL}/api/applications/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete applications')
      }

      removeFromList(ids)
    } catch (error) {
      console.error('Failed to delete job applications:', error)
      alert('Failed to delete the selected applications. Please check the backend.')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>
            Job Applications <span className="count-pill">{applications.length}</span>
          </h1>
          <p>Applications sent from the Careers job pages</p>
        </div>
      </div>

      <div className="toolbar">
        <label className="search-box">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, job title or job ID"
            aria-label="Search job applications"
          />
        </label>

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
                  aria-label="Select all job applications"
                  checked={allVisibleSelected}
                  ref={(node) => {
                    if (node) node.indeterminate = someVisibleSelected
                  }}
                  onChange={toggleAllVisible}
                  disabled={visible.length === 0 || deleting}
                />
              </th>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Job</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="table-message">
                <td colSpan="6">
                  <p>Loading job applications...</p>
                </td>
              </tr>
            ) : applications.length === 0 ? (
              <tr className="table-message">
                <td colSpan="6">
                  <h3>No applications yet</h3>
                  <p>Applications sent from a Careers job page will appear here.</p>
                </td>
              </tr>
            ) : visible.length === 0 ? (
              <tr className="table-message">
                <td colSpan="6">
                  <h3>No matching applications</h3>
                  <p>Try a different search term.</p>
                </td>
              </tr>
            ) : (
              visible.map((application) => {
                const open = openId === application._id
                const isSelected = selected.has(application._id)

                return (
                  <Fragment key={application._id}>
                    <tr className={isSelected ? 'is-selected' : undefined}>
                      <td className="inquiry-select" data-label="Select">
                        <input
                          type="checkbox"
                          className="inquiry-checkbox"
                          aria-label={`Select the application from ${application.name}`}
                          checked={isSelected}
                          onChange={() => toggleOne(application._id)}
                          disabled={deleting}
                        />
                      </td>
                      <td data-label="Applicant">
                        <div className="cell-title">{application.name}</div>
                      </td>
                      <td data-label="Contact">
                        <div className="inquiry-contact">
                          <span>{application.email || '—'}</span>
                          {application.phone && <span>{phoneOf(application)}</span>}
                        </div>
                      </td>
                      <td data-label="Job">
                        <div className="inquiry-contact">
                          <span>{application.jobTitle || '—'}</span>
                          <span>ID: {application.job}</span>
                        </div>
                      </td>
                      <td data-label="Submitted">{formatDate(application.createdAt)}</td>
                      <td className="cell-actions inquiry-actions">
                        <button
                          type="button"
                          className="inquiry-view-btn"
                          aria-expanded={open}
                          onClick={() => setOpenId(open ? null : application._id)}
                        >
                          {open ? 'Hide' : 'View'}
                        </button>
                        <button
                          type="button"
                          className="delete-job-btn"
                          onClick={() => handleDeleteOne(application)}
                          disabled={deleting}
                        >
                          <TrashIcon />
                          Delete
                        </button>
                      </td>
                    </tr>

                    {open && (
                      <tr className="inquiry-detail-row">
                        <td colSpan="6">
                          <dl className="inquiry-detail-grid">
                            {detailsOf(application).map(([label, value]) => (
                              <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value || '—'}</dd>
                              </div>
                            ))}

                            <div>
                              <dt>CV</dt>
                              <dd>
                                {application.cvFileName ? (
                                  <button
                                    type="button"
                                    className="inquiry-view-btn"
                                    onClick={() => handleDownloadCv(application)}
                                    disabled={downloadingId === application._id}
                                  >
                                    <DownloadIcon />{' '}
                                    {downloadingId === application._id
                                      ? 'Downloading...'
                                      : `${application.cvFileName}${
                                          application.cvSize ? ` (${formatSize(application.cvSize)})` : ''
                                        }`}
                                  </button>
                                ) : (
                                  '—'
                                )}
                              </dd>
                            </div>
                          </dl>

                          <div className="inquiry-message">
                            <h4>Cover Letter</h4>
                            <p>{application.coverLetter || 'Not provided'}</p>
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

export default JobApplications
