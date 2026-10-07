import { useEffect, useState } from 'react'
import { assetUrl } from '../../services/api'

// Used for both "Add Product" and "Edit Product" (when a product is passed in)
function AddProduct({ product, onSave, onCancel, saving }) {
  const isEdit = Boolean(product)

  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    image: product?.image ? assetUrl(product.image) : '',
    imageFile: null,
    playStore: product?.playStore || '',
    downloads: product?.downloads || '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const previewUrl = URL.createObjectURL(file)

    setForm((prev) => ({
      ...prev,
      image: previewUrl,
      imageFile: file,
    }))
  }

  useEffect(() => {
    return () => {
      if (form.image?.startsWith('blob:')) {
        URL.revokeObjectURL(form.image)
      }
    }
  }, [form.image])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim()) {
      alert('Please enter product name.')
      return
    }

    // When editing, the saved image is kept unless a new one is chosen
    if (!isEdit && !form.imageFile) {
      alert('Please select product image.')
      return
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      playStore: form.playStore.trim(),
      downloads: form.downloads.trim(),
    })
  }

  return (
    <div className="product-form-page">
      <div className="product-form-header">
        <div>
          <h1>{isEdit ? 'Edit Product' : 'Add Product'}</h1>
          <p>
            {isEdit
              ? 'Update this product on Our Notable Products'
              : 'Add a new product to Our Notable Products'}
          </p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Image{isEdit ? '' : ' *'}</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {form.image && (
            <div className="product-image-preview">
              <img
                src={form.image}
                alt="Product preview"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Product Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter short product description"
            rows="4"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Play Store Link</label>

            <input
              name="playStore"
              value={form.playStore}
              onChange={handleChange}
              placeholder="https://play.google.com/store/apps/details?id=..."
            />
          </div>

          <div className="form-group">
            <label>Downloads</label>

            <input
              name="downloads"
              value={form.downloads}
              onChange={handleChange}
              placeholder="e.g. 10K+, 100K+, 1M+, 5M+, 10M+"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-product-btn"
            disabled={saving}
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
