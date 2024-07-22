import React from 'react'
import { useParams } from 'react-router-dom'

import { agregarMensajeLS } from '../../FUNCIONES_LOCAL_STORAGE'


import './MensajeForm.css'

const MensajeForm = ({ mensajesAcumulados, agregarMensaje, indexCanal, indexWorkspace }) => {

    const { id, idCanalParams } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const textoMensaje = e.target[0].value

        if(textoMensaje){
            agregarMensaje([...mensajesAcumulados, 
                {
                    autor: 'Lautaro',
                    texto: textoMensaje,
                    hora: '19:57',
                    id: mensajesAcumulados.length + 1
                }]
            )
    
            agregarMensajeLS( indexWorkspace, indexCanal, {
                autor: 'Lautaro',
                texto: textoMensaje,
                hora: '19:57',
                id: mensajesAcumulados.length + 1
            })
    
            e.target[0].value = ''
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mensajeForm'>
            <textarea placeholder='Escribe tu mensaje'></textarea>
            <button>Enviar</button>
        </form>
    )
}

export default MensajeForm