import React from 'react'
import { VscSend } from "react-icons/vsc";


import './MensajeForm.css'
import useFetch from '../../Hooks/useFetch';
import { useParams } from 'react-router-dom';

const MensajeForm = () => {

    const {customFetch} = useFetch()
    const { idCanal } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const textoMensaje = e.target[0].value.trim()
        
        if (textoMensaje && textoMensaje.length < 2000) {

            const serverResponse = await customFetch(`/api/message/${idCanal}`, 'POST', { content: textoMensaje })

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