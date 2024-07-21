import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import Mensaje from '../Mensaje/Mensaje'

import './Canal.css'

const Canal = ({ canales }) => {

    const idParams = useParams()
    const { idCanalParams } = idParams

    const canalMostrado = canales.find((canal) => {
        return (canal.id_canal == Number(idCanalParams))
    })
    const { mensajes, titulo, miembros } = canalMostrado


    return (
        <>
            <h1>{titulo}</h1>
            <div className='contenedorMensajes'>
                {mensajes.map((mensaje, index) => {

                    const { autor, texto, hora } = mensaje

                    const thumbnail = miembros.find((miembro) => {
                        return (autor.toLowerCase() === miembro.nombre.toLowerCase())
                    }).thumbnail

                    return (
                        <Mensaje autor={autor} texto={texto} hora={hora} thumbnail={thumbnail} key={index} />
                    )
                })}
            </div>
        </>
    )
}

export default Canal