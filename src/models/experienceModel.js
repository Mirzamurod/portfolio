import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

// Database index qo'shish - query performance uchun
experienceSchema.index({ createdAt: -1 })
experienceSchema.index({ _id: 1 })

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema)

export default Experience
