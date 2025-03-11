export interface BaseRequestOptionsType {
    method: string
    headers: HeadersInit
    responseType: ResponseType
    params?: AnyObject
    body?: AnyObject
    cache?: RequestCache
    credentials?: RequestCredentials
    timeout?: number
}

export interface LocalStorageWithExpireValType {
    value: any
    expire: number
}

export interface BaseResponseType<T> {
    code: string
    data?: T
    message?: string
}

export interface ResponseResultType<T> {
    data: T
    status: number
    headers: AnyObject
    statusText: string
}

export interface AnyObject {
    [key: string]: any
}

export interface LocalStorageWithExpireValType {
    value: any
    expire: number
}

export interface ShopType {
    name: string
    count: number
    exchangeNum: number
    point: number
    desc: string
    imgUrl: string
}

export interface CouponType {
    name: string
    limit: string
    desc: string
    time: string
    getDesc: string
    money: number
    hadGet: boolean
}
