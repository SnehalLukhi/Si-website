import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, default: '', trim: true },
    // Paragraphs separated by a blank line
    content: { type: String, default: '' },
    bullets: { type: [String], default: [] },
  },
  { _id: false },
)

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // YYYY-MM-DD
    date: { type: String, default: '' },
    excerpt: { type: String, default: '' },
    // Card image (Home + /blog cards)
    image: { type: String, default: '' },
    // Image shown on the detail page
    articleImage: { type: String, default: '' },
    articleHeading: { type: String, default: '' },
    sections: { type: [sectionSchema], default: [] },
  },
  { timestamps: true },
)

export default mongoose.model('Blog', blogSchema)
