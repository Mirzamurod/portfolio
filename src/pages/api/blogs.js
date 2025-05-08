import connectDB from '../../libs/db'
import Blog from '../../models/blogModel'
import Text from '../../models/textModel'

export default async function handler(req, res) {
  await connectDB()

  await Blog.find()
    .populate([{ path: 'text', model: 'Text' }])
    .sort({ createdAt: -1 })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
