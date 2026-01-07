import connectDB from '../../libs/db'
import Project from '../../models/projectModel'

export default async function handler(req, res) {
  // Cache headers qo'shish - 60 soniya cache, 300 soniya stale-while-revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

  await connectDB()

  await Project.find({})
    .select('name featured url description image like createdAt')
    .sort({ createdAt: -1 })
    .lean() // Mongoose document o'rniga plain JavaScript object qaytaradi (performance)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
