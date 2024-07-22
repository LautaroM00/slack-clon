import React from 'react'
import Mensaje from '../Mensaje/Mensaje'

import './ListaMensajes.css'

const ListaMensajes = ({ mensajesAcumulados, miembros}) => {
    return (
        <div className='contenedorMensajes'>
            {mensajesAcumulados.map((mensaje, index) => {

                const { autor, texto, hora } = mensaje

                const thumbnail = miembros.find((miembro) => {
                    return (autor.toLowerCase() === miembro.nombre.toLowerCase())
                }).thumbnail

                return (
                    <Mensaje autor={autor} texto={texto} hora={hora} thumbnail={thumbnail} key={index} />
                )
            })}
        </div>
    )
}

export default ListaMensajes