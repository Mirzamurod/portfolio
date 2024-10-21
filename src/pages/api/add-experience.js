import connectDB from '../../libs/db'
import Experience from '../../models/experienceModel'

export default async function handler(req, res) {
  const secret = process.env.SECRET_KEY
  await connectDB()

  if (req.body.secret && req.body.secret.toString() === secret) {
    await Experience.create(req.body)
      .then(() => res.status(201).json({ success: true }))
      .catch(error => res.status(400).json({ success: false, message: error.message }))
  } else res.status(400).json({ success: false, message: 'Access denied' })
}

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }
