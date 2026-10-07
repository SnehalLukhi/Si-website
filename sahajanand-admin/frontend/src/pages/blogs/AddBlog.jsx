import { useEffect, useState } from 'react'
import { assetUrl } from '../../services/api'
import { PlusIcon, TrashIcon } from '../../components/Icons'

const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const emptySection = () => ({ heading: '', content: '', bulletsText: '' })

// Used for both "Add Blog" and "Edit Blog" (when a blog is passed in)
function AddBlog({ blog, onSave, onCancel, saving }) {
  const isEdit = Boolean(blog)

  const [form, setForm] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    date: blog?.date || '',
    excerpt: blog?.excerpt || '',
    articleHeading: blog?.articleHeading || '',
    image: blog?.image ? assetUrl(blog.image) : '',
    imageFile: null,
    articleImage: blog?.articleImage ? assetUrl(blog.articleImage) : '',
    articleImageFile: null,
  })

  // The slug follows the title until it is typed in by hand (an existing blog keeps its slug)
  const [slugTouched, setSlugTouched] = useState(isEdit)

  const [sections, setSections] = useState(() =>
    blog?.sections?.length
      ? blog.sections.map((section) => ({
          heading: section.heading || '',
          content: section.content || '',
          bulletsText: (section.bullets || []).join('\n'),
        }))
      : [emptySection()],
  )

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => {
      const next = { ...prev, [name]: value }

      if (name === 'title' && !slugTouched) next.slug = toSlug(value)

      return next
    })
  }

  const handleSlugChange = (event) => {
    setSlugTouched(true)
    setForm((prev) => ({ ...prev, slug: event.target.value }))
  }

  const handleImageChange = (field, fileField) => (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setForm((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
      [fileField]: file,
    }))
  }

  useEffect(() => {
    return () => {
      if (form.image?.startsWith('blob:')) URL.revokeObjectURL(form.image)
    }
  }, [form.image])

  useEffect(() => {
    return () => {
      if (form.articleImage?.startsWith('blob:')) URL.revokeObjectURL(form.articleImage)
    }
  }, [form.articleImage])

  const updateSection = (index, field, value) => {
    setSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, [field]: value } : section)),
    )
  }

  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index))
  }

  const moveSection = (index, offset) => {
    setSections((prev) => {
      const target = index + offset

      if (target < 0 || target >= prev.length) return prev

      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]

      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) {
      alert('Please enter blog title.')
      return
    }

    const slug = toSlug(form.slug || form.title)

    if (!slug) {
      alert('Please enter a valid slug (letters, numbers and hyphens).')
      return
    }

    if (!isEdit && !form.imageFile) {
      alert('Please select the blog card image.')
      return
    }

    if (!isEdit && !form.articleImageFile) {
      alert('Please select the detail/article image.')
      return
    }

    const cleanSections = sections
      .map((section) => ({
        heading: section.heading.trim(),
        content: section.content.trim(),
        bullets: section.bulletsText
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
      }))
      .filter((section) => section.heading || section.content || section.bullets.length)

    if (cleanSections.some((section) => !section.heading)) {
      alert('Every article section needs a heading.')
      return
    }

    onSave({
      title: form.title.trim(),
      slug,
      date: form.date,
      excerpt: form.excerpt.trim(),
      articleHeading: form.articleHeading.trim(),
      imageFile: form.imageFile,
      articleImageFile: form.articleImageFile,
      sections: cleanSections,
    })
  }

  return (
    <div className="product-form-page">
      <div className="product-form-header">
        <div>
          <h1>{isEdit ? 'Edit Blog' : 'Add Blog'}</h1>
          <p>
            {isEdit
              ? 'Update this blog on the website'
              : 'Add a new blog to the website'}
          </p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Blog Card Image{isEdit ? '' : ' *'}</label>

            <input type="file" accept="image/*" onChange={handleImageChange('image', 'imageFile')} />

            {form.image && (
              <div className="product-image-preview">
                <img src={form.image} alt="Card preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Detail / Article Image{isEdit ? '' : ' *'}</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange('articleImage', 'articleImageFile')}
            />

            {form.articleImage && (
              <div className="product-image-preview">
                <img src={form.articleImage} alt="Article preview" />
              </div>
            )}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. App Development"
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleSlugChange}
              placeholder="e.g. app-development"
            />
            <span className="blog-form-hint">
              Page address: /blog/{toSlug(form.slug) || 'your-slug'}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Short Excerpt</label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Shown on the Home and /blog cards"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Article Heading</label>
          <input
            name="articleHeading"
            value={form.articleHeading}
            onChange={handleChange}
            placeholder="Main heading above the article"
          />
        </div>

        <div className="blog-sections">
          <div className="blog-sections-head">
            <div>
              <label>Article Content</label>
              <span className="blog-form-hint">
                Each section heading also appears in the Table of Contents.
              </span>
            </div>

            <button
              type="button"
              className="cancel-btn blog-add-section-btn"
              onClick={() => setSections((prev) => [...prev, emptySection()])}
            >
              <PlusIcon />
              Add Section
            </button>
          </div>

          {sections.map((section, index) => (
            <div className="blog-section-card" key={index}>
              <div className="blog-section-card-head">
                <strong>Section {index + 1}</strong>

                <div className="blog-section-card-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    aria-label="Move section up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === sections.length - 1}
                    aria-label="Move section down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="delete-product-btn"
                    onClick={() => removeSection(index)}
                    aria-label="Remove section"
                  >
                    <TrashIcon />
                    Remove
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Section Heading</label>
                <input
                  value={section.heading}
                  onChange={(e) => updateSection(index, 'heading', e.target.value)}
                  placeholder="e.g. Introduction"
                />
              </div>

              <div className="form-group">
                <label>Paragraphs</label>
                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(index, 'content', e.target.value)}
                  placeholder="Write the section text. Leave a blank line between paragraphs."
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>Bullet List (optional)</label>
                <textarea
                  value={section.bulletsText}
                  onChange={(e) => updateSection(index, 'bulletsText', e.target.value)}
                  placeholder="One bullet point per line"
                  rows="4"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>

          <button type="submit" className="save-product-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Blog'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog
