import { IStudent } from "./student"

export type ICourseReview = {
    id: number
    user_id: number
    title: string
    message: string
    courses: []
    status: string
    rating: string
    student: IStudent
}