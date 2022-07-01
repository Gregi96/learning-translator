import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models'
import { AutoDetectedLanguageRequest, TranslateTextRequest, TranslateTextResponse } from './types'
import { useFetch } from 'lib/hooks'
import { HttpMethod } from 'lib/types'

export const useSupportedLanguages = (
    onSuccess: (languages: Array<Language>) => void
) => {

    return useFetch<Array<Language>>({
        url: 'languages',
        method: HttpMethod.GET
    }, {
        onSuccess: languages => {
            const allLanguages: Array<Language> = [
                {
                    code: LanguageCode.Auto,
                    name: 'Auto detect'
                }
            ].concat(languages)

            onSuccess(allLanguages)
        }
    })
}

export const useAutoDetectLanguage = (onSuccess: (autoDetectedLanguage: AutoDetectedLanguage) => void) => {

    return useFetch<Array<AutoDetectedLanguage>, AutoDetectedLanguageRequest>({
        url: 'detect',
        method: HttpMethod.POST
    }, {
        onSuccess: ([autoDetectedLanguage]) => onSuccess(autoDetectedLanguage)
    })
}

export const useTranslateText = (onSuccess: (translatedText: string) => void) => {

    return useFetch<TranslateTextResponse , TranslateTextRequest>({
        url: 'translate',
        method: HttpMethod.POST
    }, {
        onSuccess: ({translatedText}) => onSuccess(translatedText)
    })
}


