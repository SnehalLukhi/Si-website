function AddJob({ form, onChange, onSubmit, onCancel, saving }) {
  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>Add Job</h1>
          <p>Add a new job to Careers</p>
        </div>
      </div>

      <form className="job-form" onSubmit={onSubmit}>
        <h2>Add New Job</h2>

        <div className="form-grid">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Frontend Developer"
            />
          </div>

          <div className="form-group">
            <label>Experience</label>
            <input
              name="experience"
              value={form.experience}
              onChange={onChange}
              placeholder="1-3 Years"
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              name="type"
              value={form.type}
              onChange={onChange}
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={form.location}
              onChange={onChange}
              placeholder="Ahmedabad"
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              name="salary"
              value={form.salary}
              onChange={onChange}
              placeholder="₹3L - ₹6L"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="Development"
            />
          </div>

          <div className="form-group">
            <label>Expiration Date</label>
            <input
              type="date"
              name="expirationDate"
              value={form.expirationDate}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows="4"
            placeholder="Job description..."
          />
        </div>

        <div className="form-group">
          <label>Requirements</label>
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={onChange}
            rows="4"
            placeholder="Job requirements..."
          />
        </div>

        <div className="form-group">
          <label>Benefits</label>
          <textarea
            name="benefits"
            value={form.benefits}
            onChange={onChange}
            rows="4"
            placeholder="Job benefits..."
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Job'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddJob
