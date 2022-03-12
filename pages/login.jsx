import { useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import { Campo, InputSubmit } from '../components/Formulario'
import { css } from '@emotion/react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//Firebase
import firebaseApp from "../firebase/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(firebaseApp);

const Titulo = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

const ErrorMsg = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;

export default function Login() {


  const [error, setError] = useState('');

  async function submitHandler(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(email, password);

    try {
      const usuario = await signInWithEmailAndPassword(auth, email, password);
      console.log(usuario)
      console.log('Iniciando sesion...')
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/user-not-found).') {
        const msgError = 'Esta direccion de correo electronico no esta registrada en la plataforma';
        setError(msgError);
      }
    }
  }
  return (
    <Layout
      pagina={"Iniciar Sesión"}
    >
      <Titulo>Iniciar Sesión</Titulo>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Email invalido').required('El email es obligatorio'),
          password: Yup.string()
            .max(6, 'Debe tener 6 caracteres o menos ')
            .min(6, 'Debe tener 6 caracteres o menos ')
            .required('La contraseña es obligatoria'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form
          css={css`
          max-width: 600px;
          width: 95%;
          margin: 5rem auto 0 auto;
          `}

          onSubmit={submitHandler}
        >
          <Campo>
            <label htmlFor="email">Email</label>
            <Field
              type='email'
              id='email'
              placeholder='Tu email'
              name='email'
            />
          </Campo>
          <ErrorMessage component={ErrorMsg} name="email" />
          <Campo>
            <label htmlFor="password">Password</label>
            <Field
              type='password'
              id='password'
              placeholder='Tu password'
              name='password'
            />
          </Campo>
          <ErrorMessage component={ErrorMsg} name="password" />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <InputSubmit type="submit" value='Iniciar Sesión' />
        </Form>
      </Formik>

    </Layout>
  )
}
