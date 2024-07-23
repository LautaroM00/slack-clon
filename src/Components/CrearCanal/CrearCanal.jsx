import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { actualizarLS, traerLS } from '../index.js'

import './CrearCanal.css'

const CrearCanal = () => {
    const [display, setDisplay] = useState('')

    const { id } = useParams()

    const handleCrearCanal = () => {
        if (display) {
            setDisplay('')
        } else {
            setDisplay('none')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(e)
        const WORKSPACES_LS = traerLS()

        WORKSPACES_LS[Number(id - 1)].canales.push(
            {
                titulo: e.target[0].value,
                miembros: [
                    {
                        nombre: 'Zeus',
                        thumbnail: '/thumbnails/yo.png',
                        mensajesCanal: [],
                        id: 1
                    }
                ],
                mensajes: [
                ],
                id_canal: WORKSPACES_LS[Number(id - 1)].canales.length + 1
            }
        )

        actualizarLS(WORKSPACES_LS)

        e.target[0].value = ''

        setDisplay('none')
    }

    return (
        <>
            <div className='botonCrearCanal'>
                <button onClick={handleCrearCanal}>Nuevo Canal</button>
            </div>
            <form className='formCrearCanal' style={{ display: display }} onSubmit={handleSubmit}>
                <label>Nombre canal</label>
                <input type='text' placeholder='#nuevo-canal' />
                <button type='submit'>Crear</button>
            </form>
        </>
    )
}

export default CrearCanal