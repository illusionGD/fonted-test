import type { BaseResponseType, CouponType, ShopType } from '@/types'
import { isSuccessCode } from '@/utils'
import axios from 'axios'

async function request<T>(url: string): Promise<BaseResponseType<T>> {
    const { data } = await axios.get(url)
    if (!isSuccessCode(data.code)) {
        // 统一处理接口错误
        console.log('api error: ', data.message)
    }
    return data
}

export async function getShopListApi() {
    return request<ShopType[]>('/api/getProductList')
}

export async function getCouponListApi() {
    return request<CouponType[]>('/api/getCouponList')
}

