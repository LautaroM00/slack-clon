import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import CanalList from '../CanalList/CanalList'
import InputFiltroTexto from '../InputFiltroTexto/InputFiltroTexto';

const Canal = () => {
    let { id, idCanalParams } = useParams()

    let WORKSPACES = traerLS()
    let WORKSPACE = WORKSPACES[id - 1]
    let canal = WORKSPACE.canales[idCanalParams - 1]
    let { titulo, miembros } = canal


    const [idCanalState, setIdCanalState] = useState(idCanalParams)
    const [canalesState, setCanalesState] = useState(WORKSPACE.canales)
    const [mensajesAcumulados, agregarMensaje] = useState([])
    const [indexCanal, setIndexCanal] = useState('')
    const [textoFiltro, setTextoFiltro] = useState('')


    useEffect(() => {
        setIdCanalState(idCanalParams)
        agregarMensaje(canal.mensajes)
        setIndexCanal(Number(idCanalParams))
    },
        [idCanalParams]
    )

    return (
        <>
            {
                idCanalState == idCanalParams ?
                    <div className='contenedorWorkspace'>
                        <CanalList canales={canalesState} setCanalesState={setCanalesState} setTextoFiltro={setTextoFiltro}/>
                        <div className='mensajes-mensajeForm'>
                            <h2 className='canalTitulo'>{titulo}</h2>
                            <ListaMensajes mensajesAcumulados={mensajesAcumulados} miembros={miembros} textoFiltro={textoFiltro}/>
                            <InputFiltroTexto setTextoFiltro={setTextoFiltro} textoFiltro={textoFiltro} id={'filtroTextoMensajes'}/>
                            <MensajeForm mensajesAcumulados={mensajesAcumulados} agregarMensaje={agregarMensaje} indexCanal={indexCanal - 1} indexWorkspace={id - 1} />
                        </div>
                    </div> :
                    <>
                    </>
            }
        </>
    )
}

export default Canal