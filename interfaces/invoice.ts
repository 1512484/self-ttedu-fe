export type IInvoice = {
    id: number
    title: string
    slug: string
    total_price: string
    discount: string
    qty: number
    unit_price: string
    users: []
    courses: []
    status: string
    created_at: string
}