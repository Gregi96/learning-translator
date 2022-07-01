export enum HttpMethod {
    GET='get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}

export type OnSuccess<Response> = (data: Response) => void
export type OnError = () => void
