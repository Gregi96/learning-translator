import React from 'react'
import styled from 'styled-components'
import { Images } from "assets"

type ExchangeLanguageProps = {
    hidden: boolean,
    onClick(): void
}

export const ExchangeLanguage: React.FunctionComponent<ExchangeLanguageProps> = ({
                                                                                     onClick,
    hidden
}) => {

    return (
        <ExchangeContainer>
            {!hidden && (
                <Exchange
                    src={Images.Exchange}
                    onClick={onClick}
                />
            )}
        </ExchangeContainer>
    )
}

const Exchange = styled.img`
    width: 22px;
    height: 22px;
    cursor: pointer;
`

const ExchangeContainer = styled.div`
    width: 22px;
    height: 22px;
    flex-shrink: 0;
`
