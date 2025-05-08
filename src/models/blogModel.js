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

// export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)

export default Blog
