import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'

const Canal = ({ canales, indexWorkspace }) => {
    const [mensajesAcumulados, agregarMensaje] = useState([])
    const [indexCanal, setIndexCanal] = useState('')

    const idParams = useParams()
    const { idCanalParams } = idParams

    const canalMostrado = canales.find((canal, index) => {
        return (canal.id_canal == Number(idCanalParams))
    })
    const { mensajes, titulo, miembros } = canalMostrado

    useEffect(() => {
        agregarMensaje(mensajes)
        canales.map((canal, index) => {
            if (canal.id_canal == Number(idCanalParams)) {
                setIndexCanal(index)
            }
        })
    },
        [mensajes]
    )

    return (
        <>
            <h1>{titulo}</h1>
            <ListaMensajes mensajesAcumulados={mensajesAcumulados} miembros={miembros}/>
            <MensajeForm mensajesAcumulados={mensajesAcumulados} agregarMensaje={agregarMensaje} indexCanal={indexCanal} indexWorkspace={indexWorkspace} />
        </>
    )
}

export default Canal