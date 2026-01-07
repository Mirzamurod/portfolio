import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    featured: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    like: { type: Number, required: true },
  },
  { timestamps: true }
)

// Database index qo'shish - query performance uchun
projectSchema.index({ createdAt: -1 })
projectSchema.index({ _id: 1 })

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema)

export default Project
