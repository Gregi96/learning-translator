import React, { useCallback } from 'react'
import styled from 'styled-components'
import { AutoDetectedLanguage, LanguageCode } from 'lib/models'

type LanguageProps = {
    disabled: boolean
}

type ConfidenceProps = {
    hasError: boolean
    onClick(): void
    autoDetectedLanguage?: AutoDetectedLanguage
}

export const Confidence: React.FunctionComponent<ConfidenceProps> = ({
    autoDetectedLanguage = {},
    hasError,
    onClick
    }) => {


    const {confidence, language} = autoDetectedLanguage
    const getDetectedLanguage = useCallback(() => {

        if (!language) {
            return undefined
        }

        const [detectedLanguage] = Object
            .entries(LanguageCode)
            .find(([, languageCode]) => language === languageCode) || []

        return detectedLanguage ? `(${detectedLanguage})` : undefined
    }, [autoDetectedLanguage])

    return (
        <Container>
            <Percentage>
                {confidence && `${confidence}%`}
            </Percentage>
            <Language
                onClick={() => {
                    if (!hasError) {
                        onClick()
                    }
                }}
                disabled={hasError}
            >
                {hasError && 'Somethink went wrong'}
                {language && getDetectedLanguage()}
            </Language>
        </Container>
    )
}

const Container = styled.div``

const Percentage = styled.span`
    color: ${({theme}) => theme.colors.primary}
`
const Language = styled.a<LanguageProps>`
    cursor: pointer;
    text-decoration: ${({disabled}) => disabled ? undefined : 'underline'};
    cursor: ${({disabled}) => disabled ? undefined : 'pointer'};
    margin-left: 5px;
    color: ${({theme}) => theme.colors.primary}
`
