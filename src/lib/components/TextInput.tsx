import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean,
    placeholder?: string,
    value?: string,
    onChangeText?(newQuery: string): void
}

export const TextInput: React.FunctionComponent<TextInputProps> = ({
    autoFocus,
    disabled,
    placeholder,
                                                                       value,
    onChangeText
 }) => {
    const InputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (!disabled && autoFocus && InputRef.current) {
            InputRef.current.focus()
        }
    }, [])

    return (
        <Input
            value={value}
            placeholder={disabled ? undefined : placeholder}
            disabled={disabled}
            ref={InputRef}
            onChange={(event) => {
                if (onChangeText) {
                    onChangeText(event.target.value)
                }
            }}
        />
    )
}

const Input = styled.textarea`
    background-color: ${({theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: none;
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`
