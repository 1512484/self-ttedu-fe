import { IAuthor } from "./author"
import { ICategory } from "./category"

export type IBlog = {
  id: number
  title: string
  teaser: string
  content: string
  image: string
  slug: string
  meta_title: string
  meta_description: string
  meta_image: string
  created_at: string
  category: ICategory
  author: IAuthor
  categories: []
  authors: []
  status: string
}
