import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AddAiLab from './AddAiLab'
import {
  ExternalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from '../../components/Icons'
import { API_URL, assetUrl } from '../../services/api'
import { authFetch } from '../../services/auth'

function AiLab() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const editMatch = /^\/ai-lab\/([^/]+)\/edit\/?$/.exec(pathname)
  const editId = editMatch ? editMatch[1] : null
  const view = editId ? 'edit' : pathname.endsWith('/new') ? 'add' : 'list'
  const setView = (nextView) =>
    navigate(nextView === 'add' ? '/ai-lab/new' : '/ai-lab')
  const [aiLabs, setAiLabs] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [query, setQuery] = useState('')

  const fetchAiLabs = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/api/ai-lab`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch AI Lab')
      }

      setAiLabs(Array.isArray(data.aiLabs) ? data.aiLabs : [])
    } catch (error) {
      console.error('Failed to fetch AI Lab:', error)
      alert('Failed to load AI Lab. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAiLabs()
  }, [])

  const handleAddAiLab = async (form) => {
    try {
      const formData = new FormData()

      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('link', form.link)

      if (form.imageFile) {
        formData.append('image', form.imageFile)
      }

      const response = await authFetch(`${API_URL}/api/ai-lab`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to add AI Lab',
        )
      }

      setAiLabs((prev) => [data.aiLab, ...prev])
      setView('list')

      alert('AI Lab item added successfully')
    } catch (error) {
      console.error('Failed to add AI Lab:', error)
      alert('Failed to add AI Lab item. Please check the backend.')
    }
  }

  const handleEditAiLab = async (aiLabId, form) => {
    try {
      setSaving(true)

      const formData = new FormData()

      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('link', form.link)

      if (form.imageFile) {
        formData.append('image', form.imageFile)
      }

      const response = await authFetch(`${API_URL}/api/ai-lab/${aiLabId}`, {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update AI Lab')
      }

      setAiLabs((prev) => prev.map((item) => (item._id === aiLabId ? data.aiLab : item)))
      setView('list')

      alert('AI Lab item updated successfully')
    } catch (error) {
      console.error('Failed to update AI Lab:', error)
      alert('Failed to update AI Lab item. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAiLab = async (aiLabId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this AI Lab item? This action cannot be undone.',
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(aiLabId)

      const response = await authFetch(
        `${API_URL}/api/ai-lab/${aiLabId}`,
        {
          method: 'DELETE',
        },
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to delete AI Lab item',
        )
      }

      setAiLabs((prev) =>
        prev.filter((item) => item._id !== aiLabId),
      )

      alert('AI Lab item deleted successfully')
    } catch (error) {
      console.error('Failed to delete AI Lab:', error)
      alert('Failed to delete AI Lab item. Please check the backend.')
    } finally {
      setDeletingId(null)
    }
  }

  if (view === 'edit') {
    const editing = aiLabs.find((item) => item._id === editId)

    if (!editing) {
      return (
        <div className="ai-lab-page">
          <div className="ai-lab-empty">
            <h3>{loading ? 'Loading AI Lab item...' : 'AI Lab item not found'}</h3>
            <p>{loading ? 'Please wait.' : 'It may have been deleted.'}</p>

            {!loading && (
              <button type="button" className="cancel-btn" onClick={() => setView('list')}>
                Back to AI Lab
              </button>
            )}
          </div>
        </div>
      )
    }

    return (
      <AddAiLab
        key={editing._id}
        item={editing}
        onSave={(values) => handleEditAiLab(editing._id, values)}
        onCancel={() => setView('list')}
        saving={saving}
      />
    )
  }

  if (view === 'add') {
    return (
      <AddAiLab
        onSave={handleAddAiLab}
        onCancel={() => setView('list')}
      />
    )
  }

  const aiLabQuery = query.trim().toLowerCase()
  const visibleAiLabs = aiLabs.filter((item) =>
    [item.title, item.description]
      .join(' ')
      .toLowerCase()
      .includes(aiLabQuery),
  )

  return (
    <div className="ai-lab-page">
      <div className="ai-lab-header">
        <div>
          <h1>
            AI Lab <span className="count-pill">{aiLabs.length}</span>
          </h1>
          <p>Manage AI Lab content displayed on the website</p>
        </div>

        <button
          className="add-ai-lab-btn"
          onClick={() => setView('add')}
        >
          <PlusIcon />
          Add AI Lab
        </button>
      </div>

      {!loading && aiLabs.length > 0 && (
        <div className="toolbar">
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or description"
              aria-label="Search AI Lab"
            />
          </label>
        </div>
      )}

      {loading ? (
        <div className="ai-lab-empty">
          <p>Loading AI Lab...</p>
        </div>
      ) : aiLabs.length === 0 ? (
        <div className="ai-lab-empty">
          <h3>No AI Lab items yet</h3>
          <p>Add your first AI Lab item.</p>
        </div>
      ) : visibleAiLabs.length === 0 ? (
        <div className="ai-lab-empty">
          <h3>No matching items</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="card-grid ai-lab-list">
          {visibleAiLabs.map((item) => (
            <article className="ai-lab-item" key={item._id}>
              <div className="ai-lab-image">
                {item.image ? (
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                  />
                ) : (
                  <span>AI</span>
                )}
              </div>

              <div className="ai-lab-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>

              <div className="card-foot">
                <div className="card-links">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Link <ExternalIcon />
                    </a>
                  )}
                </div>

                <div className="card-actions">
                <button
                  type="button"
                  className="edit-product-btn"
                  onClick={() => navigate(`/ai-lab/${item._id}/edit`)}
                >
                  <PencilIcon />
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-ai-lab-btn"
                  onClick={() =>
                    handleDeleteAiLab(item._id)
                  }
                  disabled={deletingId === item._id}
                >
                  <TrashIcon />
                  {deletingId === item._id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default AiLab