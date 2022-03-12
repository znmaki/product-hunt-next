import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, pagina }) => {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>Pagina - {pagina}</title>
                <meta name="description" content="Sitio web de ensayo" />
                <link rel="icon" href="img/logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    )
};

export default Layout;
