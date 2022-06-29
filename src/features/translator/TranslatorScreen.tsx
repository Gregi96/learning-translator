import React from 'react'
import styled from 'styled-components'
import { useTranslations } from 'lib/hooks'
import { Confidence, Loader, SelectLanguage, TextCounter, TextInput } from 'lib/components'
import { ExchangeLanguage } from '../../lib/components/ExchangeLanguage'

export const TranslatorScreen: React.FunctionComponent = () => {
    const T = useTranslations()

    console.log("hookTest", T)

    return (
        <Container>
            <TranslatorContainer>
                <InputContainer>
                    <SelectLanguage/>
                    <TextInput/>
                    <Loader/>
                    <InputFooter>
                        <Confidence/>
                        <TextCounter/>
                    </InputFooter>
                </InputContainer>
                <ExchangeLanguage/>
                <InputContainer>
                    <SelectLanguage/>
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
