import connectDB from '../../libs/db'
import Project from '../../models/projectModel'

export default async function handler(req, res) {
  await connectDB()

  await Project.find({})
    .sort({ createdAt: -1 })
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
