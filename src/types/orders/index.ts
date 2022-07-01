export interface orderOption {
    case: string
    value: boolean
}
export interface OrderItem {
    id: number
    user_id: number
    type: number
    amount: string
    limit_amount: string
    term: number
    policy_id: string
    policy_number: string
    status: number
    url: null | string
    policy_url: null | string
    invoice_url: null | string
    buy_url: null | string
    address: string
    insurer: string
    phone: string
    email: string
    options: orderOption[],
    is_legal: number
    passport: string
    credit_number: string
    credit_institution: string
    created_at: string
    updated_at: string
}


export interface OrdersInitialState {
    loading: boolean
    data: OrderItem[] | []
    error: any
    changeStatus: {
        loading: boolean
        data: null | string
        success: boolean
        error: any
    }
}

export interface updateStatusObject {
    order_id: number
    status: number
}
