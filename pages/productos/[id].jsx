import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatearFecha } from '../../helpers'
import Image from 'next/image';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import styled from '@emotion/styled';
import { css } from '@emotion/react'
import { Campo, InputSubmit } from '../../components/Formulario'

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, arrayUnion, increment, getFirestore, getDoc } from "firebase/firestore";
const db = getFirestore();
const auth = getAuth();

const Titulo = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

const ContainerProducto = styled.div`
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem
    }
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

const ComentariosProducto = ({ currentProduct }) => {
    const [producto, setProducto] = useState({});
    const [comentario, setComentario] = useState({});
    const router = useRouter();
    let comentariozzz = {};
    const perfilVerficado = auth.currentUser; //OBTENER SI ESTA LOGEADO O NO

    const { query: { id } } = router;

    const docRef = doc(db, 'productos', id);


    //USO DE USEEFFECT PARA QUE CORRA CUANDO CAMBIE EL VALOR currentProduct
    //CONDICIONAL PARA MANDAR ERROR 404
    useEffect(() => {
        if (currentProduct == null) {
            console.log('vacio');
            router.push('/404');
        }
        else {
            setProducto(currentProduct[0]);
            console.log('lleno');
        }
    }, [id, currentProduct])

    if (Object.keys(producto).length === 0) return 'Cargando...'


    const { comentarios, creado, descripcion, empresa, imgURL, nombre, url, votos, creador, haVotado } = producto;

    const votarProducto = () => {
        if (!perfilVerficado) {
            return router.push('/login')
        }

        //SUMAR EL VOTO
        const nuevoTotal = haVotado.length + 1;

        //VALIDAR SI EL USUARIO ACTUAL VOTO
        if (haVotado.includes(perfilVerficado.uid)) return;

        //GUARDAR UID DEL USUARIO CUANDO VOTA
        const votoUID = perfilVerficado.uid;

        //ACTUALIZAR BD
        //SI HAY PROBLEMAS CON EL METODO arrayUnion: https://dev.to/wceolin/fieldvalue-arrayunion-called-with-invalid-data-nested-arrays-are-not-supported-12hm
        updateDoc(docRef, {
            votos: nuevoTotal,
            haVotado: arrayUnion(votoUID)
        });

        //ACTUALIZAR STATE
        setProducto({
            ...producto,
            votos: nuevoTotal,
            haVotado: [votoUID],
        })

        /* console.log(producto) */
    }

    const agregarComentario = (e) => {
        e.preventDefault();

        if (!perfilVerficado) {
            return router.push('/login')
        }

        comentariozzz = {
            comentario: e.target.mensaje.value,
            userId: perfilVerficado.uid,
            userName: perfilVerficado.displayName,
        }

        const arrComentario = [...comentarios, comentariozzz];

        //ACTUALIZAR DB
        updateDoc(docRef, {
            comentarios: arrayUnion(...arrComentario),
        });

        //ACTUALIZAR STATE PRODUCTO
        setProducto({
            ...producto,
            comentarios: arrComentario
        })

    }

    console.log(producto.comentarios)

    /* console.log(nuevosComentarios) */

    return (
        <Layout
            pagina={`${nombre}`}
        >
            <div className="contenedor">
                <Titulo>{`${nombre}`}</Titulo>

                <ContainerProducto>
                    <div>
                        <p>{`Fecha de publicación: ${formatearFecha(creado)}`}</p>
                        <p>{`Por ${creador.usuario} de ${empresa}`}</p>
                        <Image priority='true' layout="responsive" width={200} height={150} src={imgURL} alt={nombre} />
                        <p>{descripcion}</p>
                        {perfilVerficado && (
                            <>
                                <h2>Agrega tu Comentario</h2>
                                <Formik
                                    initialValues={{ mensaje: '', }}
                                    validationSchema={Yup.object({
                                        mensaje: Yup.string()
                                            .max(70, 'Debe tener 70 caracteres o menos ')
                                            .required('No puedes enviar comentarios vacios'),
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
                                        margin: 5rem auto 5rem auto;
                                        `}

                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <Field type="text" name='mensaje' placeholder='Escribe un comentario...' />
                                        </Campo>
                                        <ErrorMessage component={ErrorMsg} name='mensaje' />
                                        <InputSubmit type='submit' value='Agregar Comentario' />
                                    </Form>
                                </Formik>
                            </>
                        )}

                        <h2>Comentarios</h2>

                        {comentarios.length === 0 ? "Aún no hay Comentarios" : (
                            <ul>
                                {comentarios.map((comentario, i) => (
                                    <li
                                        key={`${comentario.userId}-${i}`}
                                    >
                                        <p>{comentario.comentario}</p>
                                        <p>{`Escrito por: ${comentario.userName}`}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <aside>
                        <Button
                            target='_blank'
                            bgColor='true'
                            href={url}
                        >Visitar URL</Button>

                        <div>
                            <p>{votos} Votos</p>

                            {perfilVerficado && (
                                <Button
                                    onClick={votarProducto}
                                >Votar</Button>
                            )}
                        </div>

                    </aside>
                </ContainerProducto>
            </div>
        </Layout>
    );
};

export async function getServerSideProps({ query: { id } }) {

    /* OBTENER EL DOCUMENTO CON CONDICIONAL */
    /* https://firebase.google.com/docs/firestore/query-data/get-data */

    const obtenerRef = doc(db, "productos", id);
    const obtenerProducto = await getDoc(obtenerRef);
    let currentProduct = []

    if (obtenerProducto.exists()) {
        currentProduct = [...currentProduct, obtenerProducto.data()]
    } else {
        currentProduct = null;
    }

    return {
        props: {
            currentProduct
        }
    }
}

export default ComentariosProducto;