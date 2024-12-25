import { IUser } from "./users"

export type IStudent = {
    id: number
    slug: string
    titel_name: string
    first_name: string
    last_name: string
    street_address: string
    designation: string
    city: string
    zip: string
    country: string
    teaser: string
    description: string
    image_url: string
    banner_url: string
    website_url: string
    fb_url: string
    instagram_url: string
    status: string
    site_student_profile_banner_image: string
    courses: []
    user: IUser
    courseReviews: []
    orders: []
}