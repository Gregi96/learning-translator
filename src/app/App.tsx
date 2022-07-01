import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { translatorActions, TranslatorScreen } from 'features/translator'
import { Footer, Header, Loader, Message } from 'lib/components'
import { Language } from 'lib/models'
import { useFetch } from 'lib/hooks'
import { HttpMethod } from 'lib/types'

export const App = () => {
    const [languages, setLanguages] = useState<Array<Language>>([])
    const { isLoading, hasError, fetch: getSupportedLanguages } = translatorActions.useSupportedLanguages(
        setLanguages
    )

    useEffect(() => {
        getSupportedLanguages()
    }, [])

    const getLayout = () => {
        if (isLoading) {
            return (
                <Loader>
                    Is Loading ...
                </Loader>

            )
        }
        if (hasError) {
            return (
                <Message
                    message="somethink went wrong"
                    withButton
                    onClick={() => getSupportedLanguages()}
                />
            )
        }

        if (languages.length === 0) {
            return (
                <Message
                    message="No supported language"
                />
            )
        }

        return  (
            <TranslatorScreen
                languages={languages}
            />
        )
    }


    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                <Header/>
                {getLayout()}
                <Footer/>
            </AppContainer>
        </ThemeProvider>
    )
}

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.colors.backgroundColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
