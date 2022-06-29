import React from 'react'
import styled from 'styled-components'

export const Loader = () => {
    return (
        <ActivityIndicator/>
    )
}

const ActivityIndicator = styled.div`
    width: 100%;
    height: 2px;
    margin: 5px;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 6px;
    animation: loading 1s linear infinite alternate;

    @keyframes loading2 {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
`