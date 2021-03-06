import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslations, useFetch } from 'lib/hooks'
import { Confidence, Loader, SelectLanguage, TextCounter, TextInput } from 'lib/components'
import { ExchangeLanguage } from 'lib/components/ExchangeLanguage'
import { AutoDetectedLanguage, Language, LanguageCode } from 'lib/models'
import { SelectedLanguages } from './types'
import { APP_CONFIG } from 'lib/config'
import { useAutoDetectLanguage, useTranslateText } from './actions'
import { useDebouncedCallback } from 'use-debounce';
import { useLibreTranslate } from './useLibreTranslate'

type TranslatorScreenProps = {
    languages: Array<Language>
}

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const T = useTranslations()

    const {
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
    } = useLibreTranslate()

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage
                        languages={languages}
                        exclude={[selectedLanguages.target]}
                        selectedLanguage={selectedLanguages.source}
                        onChange={(newCode) => setSelectedLanguages( prev => ({
                            ...prev,
                            source: newCode
                        }))}

                    />
                    <TextInput
                        autoFocus
                        placeholder="Type text here ..."
                        value={query}
                        onChangeText={newQuery => {

                            if (newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT) {
                                return
                            }

                            setQuery(newQuery)
                            debouncedAction(newQuery)
                        }}
                    />
                    {isDetectingLanguage && (
                        <Loader />
                    )}
                    <InputFooter>
                        <Confidence
                            hasError={hasErrorDetectingLanguage && selectedLanguages.source === LanguageCode.Auto}
                            autoDetectedLanguage={autoDetectedLanguage}
                            onClick={() => {
                                setSelectedLanguages(prevState => ({
                                    ...prevState,
                                    source: autoDetectedLanguage?.language as LanguageCode
                                }))
                                setAutoDetectedLanguage(undefined)
                                debouncedAction(query)
                            }}
                        />
                        <TextCounter
                            countOfLetters={query.length}
                            limit={APP_CONFIG.TEXT_INPUT_LIMIT}
                        />
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage
                    hidden={selectedLanguages.source === LanguageCode.Auto}
                    onClick={() => setSelectedLanguages(prev => ({
                        source: prev.target,
                        target: prev.source
                    }))}
                />
                <InputContainer>
                    <SelectLanguage
                        languages={languages}
                        exclude={[selectedLanguages.source, LanguageCode.Auto]}
                        selectedLanguage={selectedLanguages.target}
                        onChange={(newCode) => setSelectedLanguages( prev => ({
                            ...prev,
                            target: newCode
                        }))}
                    />
                    <TextInput
                        disabled
                        value={translatedText}
                        hasError={hasErrorTranslatingText}
                    />
                    {isTranslatingText && (
                        <Loader />
                    )}
                </InputContainer>
            </TranslatorContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    color: ${({theme}) => theme.colors.typography};
`

const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputFooter = styled.div`
    display: flex;
    justify-content: space-between;
`
