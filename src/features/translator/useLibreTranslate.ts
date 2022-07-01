import { useState } from 'react'
import { AutoDetectedLanguage, LanguageCode } from '../../lib/models'
import { SelectedLanguages } from './types'
import { useAutoDetectLanguage, useTranslateText } from './actions'
import { useDebouncedCallback } from 'use-debounce'

export const useLibreTranslate = () => {

    const [translatedText, setTranslatedText] = useState('')
    const [query, setQuery] = useState('')
    const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<AutoDetectedLanguage>()
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguageCode.Polish,
        target: LanguageCode.English
    })
    const {
        isLoading: isDetectingLanguage,
        hasError: hasErrorDetectingLanguage,
        fetch: autoDetectLanguage
    } = useAutoDetectLanguage(setAutoDetectedLanguage)
    const {isLoading: isTranslatingText, hasError: hasErrorTranslatingText, fetch: translateText} = useTranslateText(setTranslatedText)
    const debouncedAction = useDebouncedCallback(
        debouncedQuery => {
            if (debouncedQuery.length < 5) {
                return
            }

            selectedLanguages.source === LanguageCode.Auto
                ? autoDetectLanguage({
                    g: debouncedQuery
                })
                : translateText({
                    q: debouncedQuery,
                    source: selectedLanguages.source,
                    target: selectedLanguages.target,
                    format: 'text'
                })
        },
        1000
    )

    return {
        selectedLanguages,
        setSelectedLanguages,
        query,
        setQuery,
        debouncedAction,
        isDetectingLanguage,
        hasErrorTranslatingText,
        hasErrorDetectingLanguage,
        autoDetectedLanguage,
        setAutoDetectedLanguage,
        translatedText,
        isTranslatingText
    }
}
