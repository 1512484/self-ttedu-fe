import { IClassroom } from "./classroom"

export type ITopic = {
    id: number
    slug: string
    title: string
    teaser: string
    description: string
    image_url: string
    video_url: string
    document_url: string
    classroom: IClassroom
    courses: []
    category: string
    status: string
}