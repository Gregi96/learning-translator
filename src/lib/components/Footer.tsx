import React from 'react'
import styled from 'styled-components'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <FooterContainer>
            {year} Footer Mock
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    height: 60px;
    background-color: ${({theme}) => theme.colors.foreground};
`
