import { TText } from './text'

export type TBlog = {
  createdAt: string
  description: string
  _id: string
  image: string
  name: string
  title: string
  text: TText
}
