import connectDB from '../../libs/db'
import Project from '../../models/projectModel'

export default async function handler(req, res) {
  const secret = process.env.SECRET_KEY
  await connectDB()

  console.log(req.body)
  await Project.findByIdAndUpdate(req.body.id, req.body)
    .then(() => res.status(200).json({ success: true }))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
  res.status(200).json()
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
