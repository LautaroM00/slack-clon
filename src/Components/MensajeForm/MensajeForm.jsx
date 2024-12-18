import React from 'react'
import { VscSend } from "react-icons/vsc";


import './MensajeForm.css'
import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useWorkspaceContext } from '../../Context/WorkspaceContext';

const MensajeForm = () => {
    const { messages, setMessages, getMessages } = useWorkspaceContext()
    const {customFetch} = useFetch()
    const { idCanal } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const textoMensaje = e.target[0].value.trim()
        
        if (textoMensaje && textoMensaje.length < 2000) {

            await customFetch(`/api/message/${idCanal}`, 'POST', { content: textoMensaje })

            const lastMessage = await getMessages('last', idCanal)

            setMessages([...messages, lastMessage[0]])

            console.log(messages)

            return e.target[0].value = ''
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