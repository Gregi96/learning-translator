import React from 'react'
import styled from 'styled-components'

type MessageProps = {
    message: string,
    withButton?: boolean,
    onClick?(): void
}

export const Message: React.FunctionComponent<MessageProps> = ({
                                                                   message,
    withButton,
    onClick
}) => {

    return (
        <MessageContainer>
            <Text>
                {message}
            </Text>
            {withButton && (
                <Button
                    onClick={onClick}
                >
                    Try again
                </Button>
            )}
        </MessageContainer>
    )

}

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const Button = styled.div`
    background-color: lightgray;
    cursor: pointer;
    padding: 10px;
    margin-top: 10px;
`

const Text = styled.div`
    text-align: center;
    color: ${({theme}) => theme.colors.typography};
`
