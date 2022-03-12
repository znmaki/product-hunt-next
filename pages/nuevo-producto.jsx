import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import styled from "@emotion/styled";
import { Campo, InputSubmit, ConjuntoCampo } from '../components/Formulario'
import { css } from '@emotion/react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//FIREBASE
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "../firebase/firebaseConfig";
import { doc, setDoc, collection, addDoc, getFirestore } from "firebase/firestore";
const db = getFirestore();
const storage = getStorage(firebaseApp);
const auth = getAuth();

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

export default function nuevoProducto({ correoUser }) {

  const router = useRouter();

  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [usuario, setUsuario] = useState({});
  let product = {};

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario({ id: user.uid, usuario: user.displayName });
      } else {
        console.log('no esta logeado');
      }
    })
  }, [auth])


  /* const uploadFiles = (file) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshop) => {
        const prog = Math.round((snapshop.bytesTransferred / snapshop.totalBytes) * 100);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File avaliable at", downloadURL);
        });
      }
    );
  } */


  /* const uploadFiles = (file) => {

    const metadata = {
      contentType: '*'
    };

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    console.log(storageRef)
    console.log(uploadTask)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
        console.log('Upload is ' + prog + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Pausado');
            break;
          case 'running':
            console.log('Corriendo');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.error(error);
            break;
          case 'storage/canceled':
            console.error(error);
            break;
          case 'storage/unknown':
            console.error(error);
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrlImg(url);
        });
      }
    );
  } */

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!correoUser) {
      return router.push('/login')
    }

    const file = e.target.imagen.files[0];

    const metadata = {
      contentType: '*'
    };


    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    console.log(storageRef)
    console.log(uploadTask)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
        console.log('Upload is ' + prog + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Pausado');
            break;
          case 'running':
            console.log('Corriendo');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.error(error);
            break;
          case 'storage/canceled':
            console.error(error);
            break;
          case 'storage/unknown':
            console.error(error);
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          product = {
            nombre: e.target.nombre.value,
            empresa: e.target.empresa.value,
            url: e.target.url.value,
            descripcion: e.target.descripcion.value,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            imgURL: url,
            creador: usuario,
            haVotado:[]
          }
          addDoc(collection(db, "productos"), product);
          console.log(product);
        });

      }
    );

    /* const file = e.target.imagen.files[0];
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    console.log(storageRef)
    console.log(uploadTask)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + prog + '% done');

        switch (snapshot.state) {
          case 'paused':
            console.log('Pausado');
            break;
          case 'running':
            console.log('Corriendo');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.error(error);
            break;
          case 'storage/canceled':
            console.error(error);
            break;
          case 'storage/unknown':
            console.error(error);
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setUrlImg(url);
        });
      }
    ); */


    /* uploadFiles(file); */

    /* await addDoc(collection(db, "productos"), product) */

    /* await setDoc(doc, { products: { ...producto } }) */
    /* console.log(user, email, password); */
  }
  /*   async function aea() {
      let detector = await correoUser
      console.log(detector)
      if (!detector) {
        return router.push('/login')
      }
    } */

  return (
    <Layout
      pagina={"Nuevo Producto"}
    >
      <Titulo>Nuevo Producto {`${progress}`}</Titulo>

      <Formik
        initialValues={{ nombre: 'nombre', empresa: 'empresa', url: 'https://www.google.com/', descripcion: 'descripcion', imagen: '' }}
        validationSchema={Yup.object({
          nombre: Yup.string()
            .max(50, 'Debe tener 10 caracteres o menos ')
            .required('El nombre es obligatorio'),

          empresa: Yup.string()
            .required('El nombre de la empresa es obligatoria'),

          /* imagen: Yup.string()
            .required('Agregar imagen es obligatoria'), */

          url: Yup.string()
            .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Ingrese una url valida')
            .required('Agregar URL es obligatoria'),

          descripcion: Yup.string()
            .required('Agregar descripcion es obligatoria'),
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
          <ConjuntoCampo>
            <legend>Información General</legend>

            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <Field
                type='text'
                id='nombre'
                placeholder='Nombre del Producto'
                name='nombre'
              />
            </Campo>
            <ErrorMessage component={ErrorMsg} name="nombre" />

            <Campo>
              <label htmlFor="empresa">Empresa</label>
              <Field
                type='text'
                id='empresa'
                placeholder='Nombre empresa o Compañia'
                name='empresa'
              />
            </Campo>
            <ErrorMessage component={ErrorMsg} name="empresa" />

            <Campo>
              <label htmlFor="imagen">Imagen</label>
              <Field
                type='file'
                id='imagen'
                placeholder='Nombre empresa o Compañia'
                name='imagen'
              />
            </Campo>
            <ErrorMessage component={ErrorMsg} name="imagen" />

            <Campo>
              <label htmlFor="url">URL</label>
              <Field
                type='url'
                id='url'
                placeholder='Ingrese URL'
                name='url'
              />
            </Campo>
            <ErrorMessage component={ErrorMsg} name="url" />
          </ConjuntoCampo>


          <ConjuntoCampo>
            <legend>Información del Producto</legend>
            <Campo>
              <label htmlFor="descripcion">Descripción</label>
              <Field
                as='textarea'
                id='descripcion'
                placeholder='Ingrese la descripción'
                name='descripcion'
              />
            </Campo>
            <ErrorMessage component={ErrorMsg} name="descripcion" />
          </ConjuntoCampo>

          {error && <ErrorMsg>{error}</ErrorMsg>}
          <InputSubmit type="submit" value='Crear producto' />
        </Form>
      </Formik>

    </Layout>
  )
}