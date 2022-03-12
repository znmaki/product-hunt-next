import React from 'react'
import { css } from '@emotion/react'
import Layout from '../components/Layout'

const PaginaError = () => {
    return (
        <Layout>
            <h1
                css={css`
                margin-top: 5rem;
                text-align: center;
            `}
            >Sección no existente</h1>
        </Layout>
    )
}

export default PaginaError