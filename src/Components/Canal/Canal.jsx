import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import CanalList from '../CanalList/CanalList'

const Canal = () => {
    let { id, idCanalParams } = useParams()

    let WORKSPACES = traerLS()

    let WORKSPACE = WORKSPACES[id - 1]

    let canal = WORKSPACE.canales[idCanalParams - 1]

    const [idCanalState, setIdCanalState] = useState(idCanalParams)
    const [canalState, setCanalState] = useState(canal)
    const [mensajesAcumulados, agregarMensaje] = useState([])
    const [indexCanal, setIndexCanal] = useState('')

    let { titulo, miembros } = canalState



    useEffect(() => {
        setIdCanalState(idCanalParams)
        setCanalState(canal)
        agregarMensaje(canal.mensajes)
        setIndexCanal(Number(idCanalParams))
    },
        [idCanalParams]
    )
/*     console.log(` ${idCanalParams} --- ${idCanalState}`) */

    return (
        <>
            {
                idCanalState == idCanalParams ?
                    <>
                        <CanalList canales={WORKSPACE.canales} />
                        <h1>{titulo}</h1>
                        <ListaMensajes mensajesAcumulados={mensajesAcumulados} miembros={miembros} />
                        <MensajeForm mensajesAcumulados={mensajesAcumulados} agregarMensaje={agregarMensaje} indexCanal={indexCanal - 1} indexWorkspace={id - 1} />
                    </> :
                    <>
                    </>
            }
        </>
    )
}

export default Canal