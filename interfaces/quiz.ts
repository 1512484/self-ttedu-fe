import { ISetting } from "./setting"

export type IQuiz = {
    id: number
    title: string
    slug: string
    description: string
    category: string
    status: string
    lessons: []
    questions: []
    setting_data: ISetting
    taken_quiz: number
}