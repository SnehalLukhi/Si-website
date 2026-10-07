// Moves the original three website blogs (App / Web Development, Digital Marketing) into the database.
// Safe to run again: a blog whose slug already exists is left untouched.
//   npm run seed-blogs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Blog from '../src/models/Blog.js'
import { BLOG_UPLOAD_DIR } from '../src/middleware/uploadBlog.js'

dotenv.config()

const here = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.resolve(here, '../../../sahajanand-website/src/assets/images')
const posts = JSON.parse(fs.readFileSync(path.join(here, 'blogSeedData.json'), 'utf-8'))

// Copies an original website image into the blog upload folder and returns the stored path
fs.mkdirSync(BLOG_UPLOAD_DIR, { recursive: true })

const storeImage = (relativePath, name) => {
  const source = path.join(imagesDir, relativePath)

  if (!fs.existsSync(source)) {
    console.warn(`  image not found, skipped: ${source}`)
    return ''
  }

  const filename = `seed-${name}${path.extname(source)}`
  fs.copyFileSync(source, path.join(BLOG_UPLOAD_DIR, filename))

  return `/uploads/blogs/${filename}`
}

await mongoose.connect(process.env.MONGODB_URI)

// Oldest first, so the Home / blog list keeps the original order (newest-first listing)
for (const post of [...posts].reverse()) {
  if (await Blog.exists({ slug: post.slug })) {
    console.log(`${post.slug}: already exists, skipped`)
    continue
  }

  await Blog.create({
    title: post.title,
    slug: post.slug,
    date: post.date,
    excerpt: post.excerpt,
    image: storeImage(post.cardImage, `${post.slug}-card`),
    articleImage: storeImage(`blog/${post.articleImage}`, `${post.slug}-article`),
    articleHeading: post.articleHeading,
    sections: post.sections,
  })

  console.log(`${post.slug}: added`)
}

await mongoose.disconnect()
