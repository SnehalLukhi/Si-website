import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AddProduct from './AddProduct'
import {
  DownloadIcon,
  ExternalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from '../../components/Icons'
import { API_URL } from '../../services/api'
import { authFetch } from '../../services/auth'

function OurProducts() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const editMatch = /^\/products\/([^/]+)\/edit\/?$/.exec(pathname)
  const editId = editMatch ? editMatch[1] : null
  const view = editId ? 'edit' : pathname.endsWith('/new') ? 'add' : 'list'
  const setView = (nextView) =>
    navigate(nextView === 'add' ? '/products/new' : '/products')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [query, setQuery] = useState('')

  const fetchProducts = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/api/products`)
      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch products')
      }

      setProducts(Array.isArray(data.products) ? data.products : [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
      alert('Failed to load products. Please check the backend.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleAddProduct = async (product) => {
    if (!product.imageFile) {
      alert('Please select product image.')
      return
    }

    try {
      setSaving(true)

      const formData = new FormData()

      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('downloads', product.downloads)
      formData.append('playStore', product.playStore)
      formData.append('image', product.imageFile)

      const response = await authFetch(`${API_URL}/api/products`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to add product')
      }

      setProducts((prev) => [data.product, ...prev])

      setView('list')

      alert('Product added successfully')
    } catch (error) {
      console.error('Failed to add product:', error)
      alert('Failed to add product. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleEditProduct = async (productId, product) => {
    try {
      setSaving(true)

      const formData = new FormData()

      formData.append('name', product.name)
      formData.append('description', product.description)
      formData.append('downloads', product.downloads)
      formData.append('playStore', product.playStore)

      if (product.imageFile) {
        formData.append('image', product.imageFile)
      }

      const response = await authFetch(`${API_URL}/api/products/${productId}`, {
        method: 'PUT',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update product')
      }

      setProducts((prev) =>
        prev.map((item) => (item._id === productId ? data.product : item)),
      )

      setView('list')

      alert('Product updated successfully')
    } catch (error) {
      console.error('Failed to update product:', error)
      alert('Failed to update product. Please check the backend.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product? This action cannot be undone.',
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(productId)

      const response = await authFetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: 'DELETE',
        },
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to delete product',
        )
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      )

      alert('Product deleted successfully')
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('Failed to delete product. Please check the backend.')
    } finally {
      setDeletingId(null)
    }
  }

  if (view === 'add') {
    return (
      <AddProduct
        onSave={handleAddProduct}
        onCancel={() => setView('list')}
        saving={saving}
      />
    )
  }

  if (view === 'edit') {
    const editing = products.find((item) => item._id === editId)

    if (!editing) {
      return (
        <div className="products-page">
          <div className="no-products">
            <h3>{loading ? 'Loading product...' : 'Product not found'}</h3>
            <p>{loading ? 'Please wait.' : 'It may have been deleted.'}</p>

            {!loading && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setView('list')}
              >
                Back to products
              </button>
            )}
          </div>
        </div>
      )
    }

    return (
      <AddProduct
        key={editing._id}
        product={editing}
        onSave={(values) => handleEditProduct(editing._id, values)}
        onCancel={() => setView('list')}
        saving={saving}
      />
    )
  }

  const productQuery = query.trim().toLowerCase()
  const visibleProducts = products.filter((product) =>
    [product.name, product.category, product.description]
      .join(' ')
      .toLowerCase()
      .includes(productQuery),
  )

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>
            Our Products <span className="count-pill">{products.length}</span>
          </h1>
          <p>Manage products displayed on the website</p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => setView('add')}
        >
          <PlusIcon />
          Add Product
        </button>
      </div>

      {!loading && products.length > 0 && (
        <div className="toolbar">
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or category"
              aria-label="Search products"
            />
          </label>
        </div>
      )}

      {loading ? (
        <div className="no-products">
          <h3>Loading products...</h3>
          <p>Please wait.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <h3>No products yet</h3>
          <p>Add your first product to display it here.</p>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="no-products">
          <h3>No matching products</h3>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="card-grid products-list">
          {visibleProducts.map((product) => (
            <article
              className="product-item"
              key={product._id}
            >
              <div className="product-card-head">
                <div className="product-image">
                  {product.image ? (
                    <img
                      src={`${API_URL}${product.image}`}
                      alt={product.name}
                    />
                  ) : (
                    <span>APP</span>
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  {product.category && (
                    <span className="product-category">
                      {product.category}
                    </span>
                  )}
                </div>
              </div>

              <p className="product-desc">{product.description}</p>

              <div className="product-stats">
                {product.downloads && (
                  <span className="product-downloads">
                    <DownloadIcon />
                    {product.downloads}
                  </span>
                )}

                {product.rating > 0 && (
                  <span className="product-downloads">
                    ★ {product.rating}
                  </span>
                )}
              </div>

              <div className="card-foot">
                <div className="card-links">
                  {product.playStore && (
                    <a
                      href={product.playStore}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Play Store <ExternalIcon />
                    </a>
                  )}

                  {product.website && (
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website <ExternalIcon />
                    </a>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    type="button"
                    className="edit-product-btn"
                    onClick={() =>
                      navigate(`/products/${product._id}/edit`)
                    }
                  >
                    <PencilIcon />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-product-btn"
                    onClick={() =>
                      handleDeleteProduct(product._id)
                    }
                    disabled={deletingId === product._id}
                  >
                    <TrashIcon />
                    {deletingId === product._id
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

export default OurProducts