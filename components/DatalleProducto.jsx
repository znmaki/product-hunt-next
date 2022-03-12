import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { formatearFecha } from '../helpers'

const ProductoLi = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    :hover {
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    font-size: 1.6rem;
    margin: 0;
    color: #888;
`

const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;

    div{
        display: flex;
        align-items: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        margin-right: 2rem;

        img{
            width: 2rem;
            margin-right: 2rem; 
        }

        p{
            font-size: 1.6rem;
            margin-right: 1rem;
            &:last-of-type{
                margin: 0;
            }
        }

    }
`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center; 
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;
    div {
        font-size: 2rem;
    }
    p {
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`;

const DatalleProducto = ({ producto }) => {

    const { id, comentarios, creado, empresa, imgURL, nombre, url, votos, descripcion } = producto


    return (
        <ProductoLi>
            <DescripcionProducto>
                <div>
                    <Image priority='true' layout="responsive" width={200} height={150} src={imgURL} alt={nombre} />
                </div>

                <div>
                    <Link href={`/productos/${id}`}>
                        <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>

                    <Comentarios>
                        <div>
                            <img src="/img/comentario.png" alt="logo-comentario" />
                            <p>{comentarios.length} Comentarios</p>
                        </div>
                    </Comentarios>

                    <p>{`Fecha de publicación: ${formatearFecha(creado)}`}</p>
                </div>
            </DescripcionProducto>

            <Votos>
                <div>&#9650;</div>
                <p>{votos}</p>
            </Votos>
        </ProductoLi>
    );
};

export default DatalleProducto;
