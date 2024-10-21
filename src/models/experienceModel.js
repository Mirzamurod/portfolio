import mongoose, { Schema } from 'mongoose'

const experienceSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
)

const Experience = mongoose.models.Experience || mongoose.model('Experience', experienceSchema)

export default Experience
