import { useEffect, useState } from "react";
import DetalleProducto from '../components/DatalleProducto'
import Layout from "../components/Layout";
import firebaseApp from "../firebase/firebaseConfig";

import {
  collection,
  getFirestore,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

/* async function getDataa() {
  const querySnapshot = await getDocs(collection(db,"productos"));

  const productoArray=querySnapshot.docs.map(doc=> {
    return {id:doc.id, ...doc.data()}
  });

  return productoArray;
} */

export default function Home() {
  const [productoArray, setProductoArray] = useState([]);

  /*  useEffect(() => {
    async function getDataa() {
      const querySnapshot = await getDocs(collection(db,"productos"));      
      correrArray(querySnapshot);
    }
    getDataa();
  }, []);
  

  function correrArray(querySnapshot) {
    const productoArray=querySnapshot.docs.map(doc=> {
      return {id:doc.id, ...doc.data()}
    });

    const q = query(productoArray, orderBy("creado","desc"));

    console.log(productoArray);
  } */

  //SOLUCION 1
  /* useEffect(() => {
    function corree() {
      onSnapshot(query(collection(db,"productos"), orderBy("creado","desc")), (snapshot)=>{
        setProductoArray(snapshot.docs.map(doc =>{
          return {
            id:doc.id,
            ...doc.data()}
        }))
      });
      
    }
    corree();     
  }, []); */

  //SOLUCION 2
  useEffect(() => {
    const q = query(collection(db, "productos"), orderBy("creado", "desc"));

    onSnapshot(q, (snapshot) => {
      const productoss = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setProductoArray(productoss);
    });
  }, []);
  

  /* function pruebaSnat(snapshot) {
    const productoss=snapshot.docs.map(doc=>{
      return{
        id: doc.id,
        ...doc.data()
      }
    })
  } */

  return (
    <Layout pagina={"Inicio"}>
      <div className="listado-productos">
        <div className="contenedor">
          <ul className="bg-white">
            {productoArray.map(producto => (
              <DetalleProducto 
                  key={producto.id}
                  producto={producto}
              />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
