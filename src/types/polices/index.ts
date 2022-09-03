import { selectOption } from "../users"
import { OrderData } from "../orders"

export interface policeInitialStateType {
    savedPolicy: {
        loading: boolean
        data: OrderData | null
        error: any
        success: boolean
    },
    updatedPolicy: {
        loading: boolean
        error: any
        success: boolean
    },
    holdedPolice: OrderData | null
}
export interface createFormData {
    surname: string
    first_name: string
    second_name: string
    birthday_year: number
    birthday_month: number
    birthday_day: number
    passport_series: string
    passport_number: string
    passport_whom: string
    passport_subvision_code: string
    passport_year: number
    passport_month: number
    passport_day: number
    city: string
    street: string
    house: number
    flat: number
    building: string
    index: string
    second_city?: string
    second_street?: string
    second_house?: number
    second_flat?: number
    second_index?: string
    second_building?: string
    limit: string
    term: number
    phone: string
    email: string
    credit_name: string
    credit_number: number
    credit_year: number
    credit_month: number
    credit_day: number
    organization_name?: string
    organization_prefix?: selectOption
    holder: selectOption
    male: any
    inn?: number
    kpp?: number
    ogrn?: number
    risk: any
    region: string
    birthday: Date | string
    passport_date_issue: Date | string
    sum: number
    credit_date: Date | string
}

export interface sendCreateFormData extends Omit<createFormData, 'holder' | 'male'> {
    holder: number
    male: number
}
export interface PolicyFilterProps {
    paginated: boolean
    page: number
    from?: string | null
    to?: string | null
    today?: boolean
    search?: string
    users?: any
    status?: number
}