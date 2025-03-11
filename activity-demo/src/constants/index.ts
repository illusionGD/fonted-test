export enum ResponseType {
    JSON = 'JSON',
    TEXT = 'TEXT',
    BLOB = 'BLOB',
    ARRAYBUFFER = 'ARRAYBUFFER',
}

/**基本请求配置 */
export const BASE_REQUEST_OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    cache: 'no-cache',
    credentials: 'include',
    responseType: ResponseType.JSON,
    timeout: 60000,
}

