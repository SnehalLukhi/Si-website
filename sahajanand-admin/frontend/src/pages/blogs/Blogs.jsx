import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import AddBlog from './AddBlog'
import { PencilIcon, PlusIcon, SearchIcon, TrashIcon } from '../../components/Icons'
import { API_URL } from '../../services/api'
import { authFetch } from '../../services/auth'

const buildFormData = (blog) => {
  const formData = new FormData()

  formData.append('title', blog.title)
  formData.append('slug', blog.slug)
  formData.append('date', blog.date)
  formData.append('excerpt', blog.excerpt)
  formData.append('articleHeading', blog.articleHeading)
  formData.append('sections', JSON.stringify(blog.sections))

  if (blog.imageFile) formData.append('image', blog.imageFile)
  if (blog.articleImageFile) formData.append('articleImage', blog.articleImageFile)

  return formData
}

const formatDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '')

  if (!match) return value || ''

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])).toLocaleDateString(
    'en-US',
    { month: 'long', day: 'numeric', year: 'numeric' },
  )
}

function Blogs() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const editMatch = /^\/blogs\/([^/]+)\/edit\/?$/.exec(pathname)
  const editId = editMatch ? editMatch[1] : null
  const view = editId ? 'edit' : pathname.endsWith('/new') ? 'add' : 'list'
  const setView = (nextView) => navigate(nextView === 'add' ? '/blogs/new' : '/blogs')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [query, setQuery] = useState('')

  const fetchBlogs = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/api/blogs`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch blogs')
      }

      setBlogs(Array.isArray(data.blogs) ? data.blogs : [])
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      alert('Failed to load blogs. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleAddBlog = async (blog) => {
    try {
      setSaving(true)

      const response = await authFetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        body: buildFormData(blog),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to add blog')
      }

      setBlogs((prev) => [data.blog, ...prev])
      setView('list')
      alert('Blog added successfully')
    } catch (error) {
      console.error('Failed to add blog:', error)
      alert(error.message || 'Failed to add blog. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleEditBlog = async (blogId, blog) => {
    try {
      setSaving(true)

      const response = await authFetch(`${API_URL}/api/blogs/${blogId}`, {
        method: 'PUT',
        body: buildFormData(blog),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update blog')
      }

      setBlogs((prev) => prev.map((item) => (item._id === blogId ? data.blog : item)))
      setView('list')
      alert('Blog updated successfully')
    } catch (error) {
      console.error('Failed to update blog:', error)
      alert(error.message || 'Failed to update blog. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this blog? This action cannot be undone.',
    )

    if (!confirmed) return

    try {
      setDeletingId(blogId)

      const response = await authFetch(`${API_URL}/api/blogs/${blogId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete blog')
      }

      // Remove the card from the list right away; alert() blocks painting, so wait a frame before showing it
      flushSync(() => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId))
      })
      await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)))
      alert('Blog deleted successfully')
    } catch (error) {
      console.error('Failed to delete blog:', error)
      alert('Failed to delete blog. Please check the backend.')
    } finally {
      setDeletingId(null)
    }
  }

  if (view === 'add') {
    return <AddBlog onSave={handleAddBlog} onCancel={() => setView('list')} saving={saving} />
  }

  if (view === 'edit') {
    const editing = blogs.find((item) => item._id === editId)

    if (!editing) {
      return (
        <div className="products-page">
          <div className="no-products">
            <h3>{loading ? 'Loading blog...' : 'Blog not found'}</h3>
            <p>{loading ? 'Please wait.' : 'It may have been deleted.'}</p>

            {!loading && (
              <button type="button" className="cancel-btn" onClick={() => setView('list')}>
                Back to blogs
              </button>
            )}
          </div>
        </div>
      )
    }

    return (
      <AddBlog
        key={editing._id}
        blog={editing}
        onSave={(values) => handleEditBlog(editing._id, values)}
        onCancel={() => setView('list')}
        saving={saving}
      />
    )
  }

  const blogQuery = query.trim().toLowerCase()
  const visibleBlogs = blogs.filter((blog) =>
    [blog.title, blog.slug, blog.excerpt].join(' ').toLowerCase().includes(blogQuery),
  )

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>
            Blogs <span className="count-pill">{blogs.length}</span>
          </h1>
          <p>Manage blogs displayed on the website</p>
        </div>

        <button className="add-product-btn" onClick={() => setView('add')}>
          <PlusIcon />
          Add Blog
        </button>
      </div>

      {!loading && blogs.length > 0 && (
        <div className="toolbar">
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or slug"
              aria-label="Search blogs"
            />
          </label>
        </div>
      )}

      {loading ? (
        <div className="no-products">
          <h3>Loading blogs...</h3>
          <p>Please wait.</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="no-products">
          <h3>No blogs yet</h3>
          <p>Add your first blog to display it on the website.</p>
        </div>
      ) : visibleBlogs.length === 0 ? (
        <div className="no-products">
          <h3>No matching blogs</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="card-grid products-list">
          {visibleBlogs.map((blog) => (
            <article className="product-item" key={blog._id}>
              <div className="product-card-head">
                <div className="product-image">
                  {blog.image ? (
                    <img src={`${API_URL}${blog.image}`} alt={blog.title} />
                  ) : (
                    <span>BLOG</span>
                  )}
                </div>

                <div className="product-info">
                  <h3>{blog.title}</h3>

                  <span className="product-category">/blog/{blog.slug}</span>
                </div>
              </div>

              <p className="product-desc">{blog.excerpt}</p>

              <div className="product-stats">
                {blog.date && <span className="product-downloads">{formatDate(blog.date)}</span>}
              </div>

              <div className="card-foot">
                <div className="card-links" />

                <div className="card-actions">
                  <button
                    type="button"
                    className="edit-product-btn"
                    onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                  >
                    <PencilIcon />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-product-btn"
                    onClick={() => handleDeleteBlog(blog._id)}
                    disabled={deletingId === blog._id}
                  >
                    <TrashIcon />
                    {deletingId === blog._id ? 'Deleting...' : 'Delete'}
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

export default Blogs
