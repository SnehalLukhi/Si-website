import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    downloads: {
      type: String,
      default: '',
    },

    downloadCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    countries: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: '',
    },

    playStore: {
      type: String,
      default: '',
    },

    website: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Product', productSchema)