import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE'

const Canal = () => {
    const { id, idCanalParams } = useParams()

    const WORKSPACES = traerLS()

    const WORKSPACE = WORKSPACES[id - 1]

    const canal = WORKSPACE.canales[idCanalParams - 1]

    const [mensajesAcumulados, agregarMensaje] = useState([])
    const [indexCanal, setIndexCanal] = useState('')

    const { mensajes, titulo, miembros } = canal

    useEffect(() => {
        agregarMensaje(canal.mensajes)
        setIndexCanal(Number(idCanalParams))
    },
        [idCanalParams]
    )

    return (
        <>
            <h1>{titulo}</h1>
            <ListaMensajes mensajesAcumulados={mensajesAcumulados} miembros={miembros} />
            <MensajeForm mensajesAcumulados={mensajesAcumulados} agregarMensaje={agregarMensaje} indexCanal={indexCanal - 1} indexWorkspace={id - 1} />
        </>
    )
}

export default Canal