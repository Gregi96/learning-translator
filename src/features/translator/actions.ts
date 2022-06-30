import { useEffect, useState } from 'react'
import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models'
import { APP_CONFIG } from 'lib/config'

export const useSupportedLanguages = (
    onSuccess: (languages: Array<Language>) => void
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        console.log("component update")
    }, [])

    return {
        isLoading,
        hasError,
        fetch: () => {
            setIsLoading(true)
            setHasError(false)
            fetch(`${APP_CONFIG.API_URL}/languages`)
                .then(response => {
                    if (response.ok) {
                        return response
                    }
                    throw  response
                })
                .then(response => response.json())
                .then((languages) => {
                    const allLanguages: Array<Language> = [
                        {
                            code: LanguageCode.Auto,
                            name: 'Auto translate'
                        }
                    ].concat(languages)

                    onSuccess(allLanguages)
                })
                .catch(() => {
                    setHasError(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
}

export const useAutoDetectLanguage = (onSuccess: (autoDetectedLanguage: AutoDetectedLanguage) => void) => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        console.log("component update")
    }, [])

    return {
        isLoading,
        hasError,
        fetch: (query: string) => {
            setIsLoading(true)
            setHasError(false)
            fetch(`${APP_CONFIG.API_URL}/detect`, {
                method: 'POST',
                body: JSON.stringify({
                    q: query
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response
                    }
                    throw  response
                })
                .then(response => response.json())
                .then(([autoDetectedLanguage]) => onSuccess(autoDetectedLanguage))
                .catch(() => {
                    setHasError(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }



}
