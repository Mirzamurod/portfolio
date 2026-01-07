import mongoose, { Schema } from 'mongoose'

const blogSchema = new Schema(
  {
    name: { type: String, require: true },
    title: { type: String, require: true },
    image: { type: String, require: true },
    text: { type: mongoose.Schema.Types.ObjectId, ref: 'Text' },
  },
  { timestamps: true }
)

// Database index qo'shish - query performance uchun
blogSchema.index({ createdAt: -1 })
blogSchema.index({ _id: 1 })
blogSchema.index({ text: 1 })

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

export default Blog
