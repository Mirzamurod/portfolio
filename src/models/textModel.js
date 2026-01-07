import mongoose, { Schema } from 'mongoose'

const textSchema = new Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    text: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
  },
  { timestamps: true }
)

// Database index qo'shish - query performance uchun
textSchema.index({ slug: 1 }) // Unique index allaqachon bor, lekin explicit qo'shamiz
textSchema.index({ blog: 1 })
textSchema.index({ createdAt: -1 })

const Text = mongoose.models.Text || mongoose.model('Text', textSchema)

export default Text
