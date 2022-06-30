import React from 'react'
import styled from 'styled-components'

type TextCounterProps = {
    countOfLetters: number,
    limit: number
}

export const TextCounter: React.FunctionComponent<TextCounterProps> = ({
    countOfLetters,
    limit
}) => {

    return (
        <Counter>
            {countOfLetters}/{limit}
        </Counter>
    )
}

const Counter = styled.div`
    color: ${({theme}) => theme.colors.typography}
`
