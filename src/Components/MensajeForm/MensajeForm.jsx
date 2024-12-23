import React, { useEffect, useState } from 'react'
import { VscSend } from "react-icons/vsc";


import './MensajeForm.css'
import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useModalContext } from '../../Context/ModalContext';
import { useChannelContext } from '../../Context/ChannelContext';
import { useMessagesContext } from '../../Context/MessageContext';

const MensajeForm = () => {
    const { channels, setChannels } = useChannelContext()
    const { messages, setMessages, getMessages } = useMessagesContext()
    const { customFetch } = useFetch()
    const { idCanal } = useParams()
    const { showModal } = useModalContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const textoMensaje = e.target[0].value.trim()
        e.target[0].value = ''
        if (textoMensaje && textoMensaje.length < 2000) {
            const serverResponse = await customFetch(`/api/message/${idCanal}`, 'POST', { content: textoMensaje })

            if (serverResponse.ok) {
                const lastMessage = await getMessages('last', idCanal)
                setMessages([...messages, lastMessage[0]])

                return
            } else {
                showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
                const filteredChannels = channels.filter((channel) => channel.id != idCanal)
                setChannels(filteredChannels)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mensajeForm'>
            <textarea placeholder='Escribe tu mensaje' id='mensajeNuevo' name='mensajeNuevo'></textarea>
            <div className='contenedorIcono'>
                <button><VscSend className='sendIcono' /></button>
            </div>
        </form>
    )
}

export default MensajeForm