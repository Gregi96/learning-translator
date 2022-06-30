import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

type InputProps = {
    hasError?: boolean
}

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean,
    placeholder?: string,
    value?: string,
    onChangeText?(newQuery: string): void
    hasError?: boolean
}

export const TextInput: React.FunctionComponent<TextInputProps> = ({
    autoFocus,
    disabled,
    placeholder,
    value,
    onChangeText,
    hasError
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
            hasError={hasError}
        />
    )
}

const Input = styled.textarea<InputProps>`
    background-color: ${({theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: ${({theme, hasError}) => hasError ? `1px solid ${theme.colors.error}` : 'none'};
    border-radius: 8px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`
