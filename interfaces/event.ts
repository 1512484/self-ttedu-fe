import { ICategory } from "./category"
import { IOrganization } from "./organizations"

export type IEvent = {
    id: number
    title: string
    slug: string
    type: string
    available_seat: number
    teaser: string
    description: string
    image_url: string
    video_url: string
    document_url: string
    start_datetime: Date
    end_datetime: Date
    location: string
    visible_from: string
    visible_to: string
    registration_start_at: string
    registration_end_at: string
    attendeesCount: number
    category: ICategory
    categories: []
    users: []
    attendees: []
    authors: []
    organization: IOrganization
    status: string
}