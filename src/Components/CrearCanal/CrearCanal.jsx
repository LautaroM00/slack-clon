import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { GrAdd } from "react-icons/gr";

import { actualizarLS, traerLS } from '../index.js'

import './CrearCanal.css'

const CrearCanal = ({  setDisplay }) => {
    const [mostrarInput, setMostrarInput] = useState('none')
    const [mostrarLabel, setMostrarLabel] = useState('')

    const handleMostrarInput = () => {
        if(mostrarInput){
            setMostrarInput('')
            setMostrarLabel('none')
        }else{
            setMostrarInput('none')
            setMostrarLabel('')
        }
    }

    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(e.target[0].value){
            const WORKSPACES = traerLS()

            WORKSPACES[Number(id - 1)].canales.push(
                {
                    titulo: e.target[0].value,
                    miembros: [
                        {
                            nombre: 'Lautaro',
                            thumbnail: '/thumbnails/yo.png',
                            mensajesCanal: [],
                            id: 1
                        }
                    ],
                    mensajes: [
                        {
                            autor: 'Lautaro',
                            texto: 'HUEVO DIBU HUEVO!',
                            hora: '19:57',
                            id: 1
                        }
                    ],
                    id_canal: WORKSPACES[Number(id - 1)].canales.length + 1
                }
            )
    
            actualizarLS(WORKSPACES)
    
            e.target[0].value = ''
    
            setDisplay('none')
            setMostrarInput('none')
            setMostrarLabel('')
        }
    }

    return (
        <>
            <form className='formCrearCanal'  onSubmit={handleSubmit}>
                <label style={{display: mostrarLabel}} onClick={handleMostrarInput}>Crear canal</label>
                <input type='text' placeholder='#nuevo-canal' style={{ display: mostrarInput }}/>
                <button type='submit' style={{ display: mostrarInput }}><GrAdd style={{ width: '20px', height: '20px' }} /></button>
            </form>
            {!mostrarInput && <IoMdClose style={{ width: '20px', height: '20px' }} onClick={handleMostrarInput}/>}
        </>
    )
}

export default CrearCanal