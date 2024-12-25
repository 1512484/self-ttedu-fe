export type ILesson = {
    id: number
    title: string
    slug: string,
    content_data: string,
    teaser: string
    description: string
    image_url: string
    video_url: string
    document_url: string
    category: string
    users: []
    courses: []
    status: string
}