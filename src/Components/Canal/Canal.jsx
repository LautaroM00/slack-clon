import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import CanalList from '../CanalList/CanalList'
import InputFiltroTexto from '../InputFiltroTexto/InputFiltroTexto';
import { useChannelContext } from '../../Context/ChannelContext'
import MessageProvider from '../../Context/MessageContext'

const Canal = () => {
    const { channels, setChannelName, channelName } = useChannelContext()
    const [textoFiltro, setTextoFiltro] = useState('')

    let { idCanal } = useParams()

    useEffect(() => {
        channels && channels.forEach((channel) => {
            if(channel.id == idCanal){
                setChannelName(channel.name)
            }
        })
    },
    [channels]
)

    return (
        <div className='contenedorWorkspace'>
            <CanalList channels={channels} setTextoFiltro={setTextoFiltro} />
            <div className='mensajes-mensajeForm'>
                {
                    channels && channels.some((channel) => channel.id === Number(idCanal)) ?
                        <MessageProvider>
                            <h2 className='canalTitulo'>{channelName}</h2>
                            <ListaMensajes idCanal={idCanal} textoFiltro={textoFiltro} setTextoFiltro={setTextoFiltro} />
                            <InputFiltroTexto setTextoFiltro={setTextoFiltro} textoFiltro={textoFiltro} id={'filtroTextoMensajes'} />
                            <MensajeForm />
                        </MessageProvider> :
                        <h2 className='canalTitulo'>Seleccione un canal</h2>
                }
            </div>
        </div>

    )
}

export default Canal