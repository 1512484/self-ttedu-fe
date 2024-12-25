import { IQuiz } from "./quiz"

export type IClass = {
    id: number
    course_id: number
    img: string
    name: string
    icon: string
    content: string
    title: string
    skill: string
    duration: string
    description: string
    bar: string
    percent: any
    rating: any
    quiz: IQuiz
    lessons: []
}