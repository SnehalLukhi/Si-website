import { useState } from 'react'

function AddAiLab({ onSave, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: '',
    imageFile: null,
    imagePreview: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      alert('Please enter AI Lab title.')
      return
    }

    onSave(form)
  }

  return (
    <div className="ai-lab-form-page">
      <div className="ai-lab-form-header">
        <div>
          <h1>Add AI Lab</h1>
          <p>Add a new AI Lab item to the website</p>
        </div>
      </div>

      <form
        className="ai-lab-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Title *</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter AI Lab title"
          />
        </div>

        <div className="form-group">
          <label>Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {form.imagePreview && (
            <div className="ai-lab-image-preview">
              <img
                src={form.imagePreview}
                alt="Preview"
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter AI Lab description"
            rows="5"
          />
        </div>

        <div className="form-group">
          <label>Link</label>

          <input
            name="link"
            value={form.link}
            onChange={handleChange}
            placeholder="https://..."
          />
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
            className="save-ai-lab-btn"
          >
            Save AI Lab
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddAiLab