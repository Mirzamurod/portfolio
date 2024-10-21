import connectDB from '../../libs/db'
import Experience from '../../models/experienceModel'

export default async function handler(req, res) {
  await connectDB()

  await Experience.find({})
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
