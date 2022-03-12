import React, { useState, useEffect } from "react";
import Router from "next/router";
import "../styles/normalize.css";
import "../styles/globals.css";

import firebaseApp from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(firebaseApp);

function MyApp({ Component, pageProps }) {
  const [userGlobal, setUserGlobal] = useState(null);

  useEffect(() => {
    const verificador = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUserGlobal(userFirebase);
        /* Router.push('/'); */
      } else {
        setUserGlobal(null);
      }
    });
    return () => verificador();
  }, []);  

  /* console.log(userGlobal); */

  return (
    <>
      {userGlobal ? (
        <Component {...pageProps} correoUser={userGlobal.email} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
