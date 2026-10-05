import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AddJob from './AddJob'
import { PlusIcon, SearchIcon, TrashIcon } from '../../components/Icons'
import { API_URL } from '../../services/api'
import { authFetch } from '../../services/auth'

const emptyForm = {
  title: '',
  experience: '',
  type: 'Full Time',
  location: '',
  salary: '',
  category: '',
  description: '',
  requirements: '',
  benefits: '',
  expirationDate: '',
}

function Jobs() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const view = pathname.endsWith('/new') ? 'add' : 'list'
  const setView = (nextView) =>
    navigate(nextView === 'add' ? '/careers/new' : '/careers')
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState('')

  const fetchJobs = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/api/jobs`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch jobs')
      }

      setJobs(data.jobs)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
      alert('Failed to load jobs. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleAddJob = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      alert('Please enter Job Title')
      return
    }

    try {
      setSaving(true)

      const response = await authFetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to add job')
      }

      setJobs((prev) => [data.job, ...prev])

      setForm(emptyForm)
      setView('list')

      alert('Job added successfully')
    } catch (error) {
      console.error('Failed to add job:', error)
      alert('Failed to add job. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteJob = async (jobId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this job? This action cannot be undone.',
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(jobId)

      const response = await authFetch(`${API_URL}/api/jobs/${jobId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete job')
      }

      setJobs((prev) => prev.filter((job) => job._id !== jobId))

      alert('Job deleted successfully')
    } catch (error) {
      console.error('Failed to delete job:', error)
      alert('Failed to delete job. Please check the backend.')
    } finally {
      setDeletingId(null)
    }
  }

  if (view === 'add') {
    return (
      <AddJob
        form={form}
        onChange={handleChange}
        onSubmit={handleAddJob}
        onCancel={() => setView('list')}
        saving={saving}
      />
    )
  }

  const jobQuery = query.trim().toLowerCase()
  const visibleJobs = jobs.filter((job) =>
    [job.title, job.category, job.location, job.experience, job.type]
      .join(' ')
      .toLowerCase()
      .includes(jobQuery),
  )

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>
            Careers <span className="count-pill">{jobs.length}</span>
          </h1>
          <p>Manage job opportunities</p>
        </div>

        <button
          className="add-job-btn"
          onClick={() => setView('add')}
        >
          <PlusIcon />
          Add Job
        </button>
      </div>

      <div className="toolbar">
        <label className="search-box">
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, category or location"
            aria-label="Search jobs"
          />
        </label>
      </div>

      <div className="data-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Experience</th>
              <th>Type</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr className="table-message">
                <td colSpan="6">
                  <p>Loading jobs...</p>
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr className="table-message">
                <td colSpan="6">
                  <h3>No jobs yet</h3>
                  <p>Add your first job using the Add Job button.</p>
                </td>
              </tr>
            ) : visibleJobs.length === 0 ? (
              <tr className="table-message">
                <td colSpan="6">
                  <h3>No matching jobs</h3>
                  <p>Try a different search term.</p>
                </td>
              </tr>
            ) : (
              visibleJobs.map((job) => (
                <tr key={job._id}>
                  <td data-label="Position">
                    <div className="cell-title">{job.title}</div>
                  </td>
                  <td data-label="Experience">{job.experience || '—'}</td>
                  <td data-label="Type">
                    {job.type ? <span className="tag">{job.type}</span> : '—'}
                  </td>
                  <td data-label="Location">{job.location || '—'}</td>
                  <td data-label="Salary">{job.salary || '—'}</td>
                  <td className="cell-actions">
                    <button
                      type="button"
                      className="delete-job-btn"
                      onClick={() => handleDeleteJob(job._id)}
                      disabled={deletingId === job._id}
                    >
                      <TrashIcon />
                      {deletingId === job._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Jobs