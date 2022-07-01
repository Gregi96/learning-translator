import { HttpMethod, OnSuccess } from 'lib/types'
import { useState } from 'react'
import { APP_CONFIG } from '../config'

type FetchProps = {
    method: HttpMethod,
    url: string
}

type FetchActions<Response> = {
    onSuccess: OnSuccess<Response>
    onError?(): void
}

export const useFetch = <Response, Request = {}>( config: FetchProps, actions: FetchActions<Response> ) => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    return {
        isLoading,
        hasError,
        fetch: (params?: Request) => {
            setIsLoading(true)
            setHasError(false)

            const fetchConfig = {
                ...config.method === HttpMethod.POST && {
                    body: JSON.stringify({
                        ...params
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: config.method
                }
            }

            fetch(`${APP_CONFIG.API_URL}/${config.url}`, fetchConfig)
                .then(response => {
                    if (response.ok) {
                        return response
                    }
                    throw  response
                })
                .then(response => response.json())
                .then(actions.onSuccess)
                .catch(() => {
                    setHasError(true)

                    if (actions.onError) {
                        actions.onError()
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
}
