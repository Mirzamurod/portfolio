import connectDB from '../../libs/db'
import Text from '../../models/textModel'
import Blog from '../../models/blogModel' // Blog modelini import qilish - populate uchun kerak

export default async function handler(req, res) {
  await connectDB()
  const { slug } = req.query

  await Text.findOne({ slug })
    .populate([{ path: 'blog', model: Blog }]) // Blog modelini to'g'ridan-to'g'ri ishlatish
    .lean() // Mongoose document o'rniga plain JavaScript object qaytaradi (performance)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
