import React from 'react'
import { useParams } from 'react-router-dom'
import { VscSend } from "react-icons/vsc";


import { agregarMensajeLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { horas, minutos } from './tiempo';


import './MensajeForm.css'

const MensajeForm = ({ mensajesAcumulados, agregarMensaje, indexCanal, indexWorkspace }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        const textoMensaje = e.target[0].value

        if (textoMensaje && textoMensaje.length < 2000) {
            agregarMensaje([...mensajesAcumulados,
            {
                autor: 'Tú',
                texto: textoMensaje,
                hora: `${horas}:${minutos}`,
                id: mensajesAcumulados.length + 1
            }]
            )

            agregarMensajeLS(indexWorkspace, indexCanal, {
                autor: 'Tú',
                texto: textoMensaje,
                hora: `${horas}:${minutos}`,
                id: mensajesAcumulados.length + 1
            })

            e.target[0].value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mensajeForm'>
            <textarea placeholder='Escribe tu mensaje'></textarea>
            <div className='contenedorIcono'>
                <button><VscSend className='sendIcono' /></button>
            </div>
        </form>
    )
}

export default MensajeForm