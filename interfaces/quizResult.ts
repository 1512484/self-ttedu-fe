import { ICourse } from "./course"

export type IQuizResult = {
    id: number
    user_id: number
    course_id: number
    quiz_id: number
    course: ICourse
    users: []
    courses: []
    quizzes: []
    lessons: []
    questions: []
    settings_data: string
    content_data: string
    correct_number: number
    wrong_number: number
    not_answers_number: number
    take_time: number
    score_percentage: number
    earned_score: number
}
