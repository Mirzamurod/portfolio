import mongoose, { Schema } from 'mongoose'

const textSchema = new Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    text: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
  },
  { timestamps: true }
)

// export default mongoose.models.Text || mongoose.model('Text', textSchema)

const Text = mongoose.models.Text || mongoose.model('Text', textSchema)

export default Text
