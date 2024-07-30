import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { GrAdd } from "react-icons/gr";

import { actualizarLS, traerLS } from '../index.js'

import './CrearCanal.css'
import ListaCondiciones from '../ListaCondiciones/ListaCondiciones.jsx';

const CrearCanal = ({ setDisplay, setCanalesState }) => {
    const [mostrarInput, setMostrarInput] = useState('none')
    const [mostrarLabel, setMostrarLabel] = useState('')
    const [bordeInput, setBordeInput] = useState('')
    const [displayCondiciones, setDisplayCondiciones] = useState('none')

    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        let nombreCanal = e.target[0].value

        if (nombreCanal &&
            nombreCanal.length < 24 &&
            nombreCanal.length > 2) {
            const WORKSPACES = traerLS()

            WORKSPACES[Number(id - 1)].canales.push(
                {
                    titulo: nombreCanal,
                    miembros: [
                        {
                            nombre: 'Tú',
                            thumbnail: '/thumbnails/chad.png',
                            mensajesCanal: [],
                            id: 1
                        }
                    ],
                    mensajes: [
                    ],
                    id_canal: WORKSPACES[Number(id - 1)].canales.length + 1
                }
            )

            actualizarLS(WORKSPACES)
            setCanalesState(WORKSPACES[Number(id - 1)].canales)
            e.target[0].value = ''

            setDisplay('none')
            setMostrarInput('none')
            setMostrarLabel('');
            setBordeInput('')
            setDisplayCondiciones('none')
        }else{
            setBordeInput('3px solid red')
            setDisplayCondiciones('')
        }
    }

    const handleMostrarInput = () => {
        if (mostrarInput) {
            setMostrarInput('')
            setMostrarLabel('none')
        }
    }

    const handleCerrarInput = () => {
        setMostrarInput('none')
        setMostrarLabel('')
    }

    return (
        <>
            <div className='especial' onClick={handleMostrarInput} style={mostrarInput ? {cursor: 'pointer'} :  {cursor: ''}}>
                <form className='formCrearCanal' onSubmit={handleSubmit}>
                    <label style={{ display: mostrarLabel, cursor: 'pointer' }}>Crear canal</label>
                    <input type='text' placeholder='#nuevo-canal' style={{ display: mostrarInput, border: bordeInput }} />
                    <button type='submit' style={{ display: mostrarInput, cursor: 'pointer' }}><GrAdd style={{ width: '20px', height: '20px' }} /></button>
                </form>
                {!mostrarInput && <IoMdClose style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleCerrarInput} />}
            </div>
            <ListaCondiciones displayCondiciones={displayCondiciones} condiciones={['Entre 3 y 23 caracteres']} />
        </>
    )
}

export default CrearCanal