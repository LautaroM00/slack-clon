import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import CanalList from '../CanalList/CanalList'
import InputFiltroTexto from '../InputFiltroTexto/InputFiltroTexto';
import { useWorkspaceContext } from '../../Context/WorkspaceContext'
import ModalMensaje from '../../Screens/ModalMensaje/ModalMensaje'

const Canal = () => {

    const { getChannels, channels, setChannels, actualChannel, setActualChannel } = useWorkspaceContext()

    let { workspaceName, idCanal } = useParams()
    const [textoFiltro, setTextoFiltro] = useState('')


    useEffect(() => {

            getChannels(workspaceName, 'all')
                .then((channels) => {
                    setChannels(channels)

                })

    },
        [idCanal]
    )

    useEffect(() => {
        if (channels) {
            setActualChannel(() => {
                return channels.find((channel) => channel.id === Number(idCanal))
            })
        }
    },
        [channels, idCanal]
    )



    return (
        <div className='contenedorWorkspace'>
            <CanalList channels={channels} setChannels={setChannels} setTextoFiltro={setTextoFiltro} />
            <div className='mensajes-mensajeForm'>
                {
                    channels ?
                        actualChannel ?
                            <>
                                <h2 className='canalTitulo'>{actualChannel.name}</h2>
                                <ListaMensajes idCanal={idCanal} textoFiltro={textoFiltro} setTextoFiltro={setTextoFiltro} />
                                <InputFiltroTexto setTextoFiltro={setTextoFiltro} textoFiltro={textoFiltro} id={'filtroTextoMensajes'} />
                                <MensajeForm />
                            </> :
                            <h2 className='canalTitulo'>Seleccione un canal</h2>
                        :
                        <h2 className='canalTitulo'>Seleccione un canal</h2>
                }
            </div>
        </div>

    )
}

export default Canal