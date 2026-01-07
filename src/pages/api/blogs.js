import connectDB from '../../libs/db'
import Blog from '../../models/blogModel'
import Text from '../../models/textModel' // Text modelini import qilish - populate uchun kerak

export default async function handler(req, res) {
  // Cache headers qo'shish - 60 soniya cache, 300 soniya stale-while-revalidate
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

  await connectDB()

  await Blog.find()
    .select('name title image createdAt')
    .populate([
      {
        path: 'text',
        model: Text, // Text modelini to'g'ridan-to'g'ri ishlatish
        select: 'slug text createdAt', // Faqat kerakli fieldlar
      },
    ])
    .sort({ createdAt: -1 })
    .lean() // Mongoose document o'rniga plain JavaScript object qaytaradi (performance)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(400).json({ success: false, message: error.message }))
}
