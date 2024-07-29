import React from 'react'
import Mensaje from '../Mensaje/Mensaje'

import './ListaMensajes.css'

const ListaMensajes = ({ mensajesAcumulados, miembros, textoFiltro}) => {
    return (
        <div className='contenedorMensajes'>
            {mensajesAcumulados.map((mensaje, index) => {

                const { autor, texto, hora } = mensaje
                const miembroEncontrado = miembros.find((miembro) => {
                    return (autor.toLowerCase() === miembro.nombre.toLowerCase())
                })

                const thumbnail = miembroEncontrado.thumbnail

                return (
                    <Mensaje autor={autor} texto={texto} hora={hora} thumbnail={thumbnail} key={index} textoFiltro={textoFiltro}/>
                )
            })}
        </div>
    )
}

export default ListaMensajes