import Link from 'next/link';
import React from 'react';
import Button from './Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react'

//Firebase
import firebaseApp from "../firebase/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebaseApp);

const ContainerHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;

    @media(min-width: 768px){
        display: flex;
        justify-content: space-between;
    }
`;

const Logo = styled.p`
    color: var(--primary);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-left: 2rem;
    cursor: pointer;
`;

const Sesion = styled.div`
    display: flex;
    align-items: center;
`;

const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding: 1rem;
    min-width: 300px;
`;

const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: .5px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover{
        cursor: pointer;
    }
`;

const Formulario = styled.form`
    position: relative;
`;

const Nav = styled.nav`
    padding-left: 2rem;

    a{
        font-size: 1.8rem;
        margin-left: 2rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;

        &:last-of-type{
            margin-right: 0;
        }
    }
`;

const Header = () => {
    let usuario = false;

    let infoUser = {};
    const { currentUser } = auth;

    if (currentUser !== null) {
        usuario = true;
        infoUser = currentUser;
        /* console.log(infoUser) */
    }



    return (
        <header
            css={css`
            border-bottom: 2px solid var(--gris3);
            padding: 1rem 0;
        `}
        >
            <ContainerHeader>
                <Sesion>
                    <Link href='/'>
                        <Logo>P</Logo>
                    </Link>

                    <Formulario>
                        <InputText
                            placeholder='Buscar Producto'
                            type="text"
                        />

                        <InputSubmit type='submit'>Buscar</InputSubmit>
                    </Formulario>

                    <Nav>
                        <Link href="/">Inicio</Link>
                        <Link href="/populares">Populares</Link>
                        {usuario && (
                            <Link href="/nuevo-producto">Nuevo Producto</Link>
                        )}

                    </Nav>
                </Sesion>
                <Sesion>

                    {usuario ? (
                        <>
                            <p css={css`margin-right: 2rem;`}>{`Hola: ${infoUser.displayName}`}</p>
                            <Button bgColor='true' type='button' onClick={() => signOut(auth)}>Cerrar Sesión</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button bgColor='true'>Login</Button>
                            </Link>
                            <Link href="/crear-cuenta">
                                <Button>Crear Cuenta</Button>
                            </Link>
                        </>
                    )}
                </Sesion>
            </ContainerHeader>
        </header>
    )
};

export default Header;
