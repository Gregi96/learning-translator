import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Footer } from './Footer'

type LoaderProps = {
    children?: React.ReactNode
}

export const Loader: React.FunctionComponent<LoaderProps> = (
    {children}
) => {

    return (
        <LoaderContainer>
            <ActivityIndicator/>
            <Message>
                {children}
            </Message>
        </LoaderContainer>
    )
}


const ActivityIndicator = styled.div`
    width: 100%;
    height: 2px;
    margin: 5px;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 6px;
    animation: loading 1s linear infinite alternate;

    @keyframes loading {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
`

const LoaderContainer = styled.div`

`

const Message = styled.div`
    display: flex;
    justify-content: center;
    color: ${({theme}) => theme.colors.typography};
`
