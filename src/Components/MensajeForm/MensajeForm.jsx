import React from 'react'
import { useParams } from 'react-router-dom'
import { VscSend } from "react-icons/vsc";


import { agregarMensajeLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { horas, minutos, segundos } from './tiempo';


import './MensajeForm.css'

const MensajeForm = ({ mensajesAcumulados, agregarMensaje, indexCanal, indexWorkspace }) => {

    const { id, idCanalParams } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const textoMensaje = e.target[0].value

        if (textoMensaje) {
            agregarMensaje([...mensajesAcumulados,
            {
                autor: 'Lautaro',
                texto: textoMensaje,
                hora: `${horas}:${minutos}:${segundos}`,
                id: mensajesAcumulados.length + 1
            }]
            )

            agregarMensajeLS(indexWorkspace, indexCanal, {
                autor: 'Lautaro',
                texto: textoMensaje,
                hora: `${horas}:${minutos}:${segundos}`,
                id: mensajesAcumulados.length + 1
            })

            e.target[0].value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mensajeForm'>
            <textarea placeholder='Escribe tu mensaje' ></textarea>
            <button><VscSend style={{ width: '25px', height: '25px' }} className='icono' /></button>
        </form>
    )
}

export default MensajeForm