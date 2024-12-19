import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MensajeForm from '../MensajeForm/MensajeForm'
import ListaMensajes from '../ListaMensajes/ListaMensajes'

import './Canal.css'
import CanalList from '../CanalList/CanalList'
import InputFiltroTexto from '../InputFiltroTexto/InputFiltroTexto';
import { useWorkspaceContext } from '../../Context/WorkspaceContext'

const Canal = () => {
    const { getChannels, channels, setChannels } = useWorkspaceContext()
    const [textoFiltro, setTextoFiltro] = useState('')
    const [thisChannels, setThisChannels] = useState([])

    let { workspaceName, idCanal } = useParams()

    useEffect(() => {
        channels.some((channel) => channel.belongs_to === workspaceName) ?

            setThisChannels(() => {
                return channels.filter((channel) => channel.belongs_to === workspaceName)
            }) :
            getChannels(workspaceName, 'all')
                .then((channelsGotten) => {
                    setChannels((prevChannels) => {
                        channelsGotten.forEach((channel) => prevChannels.push(channel))
                        return [...prevChannels]
                    })
                    setThisChannels(() => {
                        return channels.filter((channel) => channel.belongs_to === workspaceName)
                    })
                });
        console.log('render')
    },
        [workspaceName, idCanal]
    )



    return (
        <div className='contenedorWorkspace'>
            <CanalList channels={thisChannels} setChannels={setChannels} setTextoFiltro={setTextoFiltro} />
            <div className='mensajes-mensajeForm'>
                {
                    thisChannels.some((channel) => channel.id === Number(idCanal)) ?
                        <>
                            <h2 className='canalTitulo'>{'hola'}</h2>
                            <ListaMensajes idCanal={idCanal} textoFiltro={textoFiltro} setTextoFiltro={setTextoFiltro} />
                            <InputFiltroTexto setTextoFiltro={setTextoFiltro} textoFiltro={textoFiltro} id={'filtroTextoMensajes'} />
                            <MensajeForm />
                        </> :
                        <h2 className='canalTitulo'>Seleccione un canal</h2>
                }
            </div>
        </div>

    )
}

export default Canal