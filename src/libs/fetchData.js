// Helper funksiyalar - SSG/ISR uchun database querylar
import connectDB from './db'
import Project from '../models/projectModel'
import Experience from '../models/experienceModel'
import Blog from '../models/blogModel'
import Text from '../models/textModel'

export async function fetchProjects() {
  await connectDB()
  const projects = await Project.find({})
    .select('name featured url description image like createdAt')
    .sort({ createdAt: -1 })
    .lean()
  return JSON.parse(JSON.stringify(projects))
}

export async function fetchExperiences() {
  await connectDB()
  const experiences = await Experience.find({})
    .select('name year description createdAt')
    .sort({ createdAt: -1 })
    .lean()
  return JSON.parse(JSON.stringify(experiences))
}

export async function fetchBlogs() {
  await connectDB()
  const blogs = await Blog.find()
    .select('name title image createdAt')
    .populate([
      {
        path: 'text',
        model: Text,
        select: 'slug text createdAt',
      },
    ])
    .sort({ createdAt: -1 })
    .lean()
  return JSON.parse(JSON.stringify(blogs))
}

export async function fetchTextBySlug(slug) {
  await connectDB()
  const text = await Text.findOne({ slug })
    .populate([{ path: 'blog', model: Blog }])
    .lean()
  return text ? JSON.parse(JSON.stringify(text)) : null
}

export async function fetchAllBlogSlugs() {
  await connectDB()
  const texts = await Text.find({}).select('slug').lean()
  return texts.map(text => ({ params: { slug: text.slug } }))
}
