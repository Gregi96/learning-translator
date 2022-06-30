import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslations } from 'lib/hooks'
import { Confidence, SelectLanguage, TextCounter, TextInput } from 'lib/components'
import { ExchangeLanguage } from 'lib/components/ExchangeLanguage'
import { Language, LanguageCode } from 'lib/models'
import { SelectedLanguages } from './types'

type TranslatorScreenProps = {
    languages: Array<Language>
}

export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) => {
    const T = useTranslations()
    const [selectedLanguages, setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguageCode.Polish,
        target: LanguageCode.English
    })


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
                    <TextInput/>
                    {/*<Loader/>*/}
                    <InputFooter>
                        <Confidence/>
                        <TextCounter/>
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
                    <TextInput/>
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
