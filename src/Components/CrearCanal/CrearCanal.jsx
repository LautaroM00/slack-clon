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
    const [errorNombreRepetido, setErrorNombreRepetido] = useState('')
    const [errorLongitudNombre, setErrorLongitudNombre] = useState('')


    const { idWorkspace } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        const WORKSPACES = traerLS()

        let nombreCanalNuevo = e.target[0].value

        let estaRepetido = WORKSPACES[Number(idWorkspace - 1)].canales.find((canal) => {
            return (nombreCanalNuevo === canal.titulo)
        })

        if (nombreCanalNuevo &&
            nombreCanalNuevo.length < 24 &&
            nombreCanalNuevo.length > 2 && !estaRepetido) {

            WORKSPACES[Number(idWorkspace - 1)].canales.push(
                {
                    titulo: nombreCanalNuevo,
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
                    id_canal: WORKSPACES[Number(idWorkspace - 1)].canales.length + 1
                }
            )

            actualizarLS(WORKSPACES)
            setCanalesState(WORKSPACES[Number(idWorkspace - 1)].canales)
            e.target[0].value = ''

            setDisplay('none')
            setMostrarInput('none')
            setMostrarLabel('');
            setBordeInput('')
            setDisplayCondiciones('none')
            setErrorNombreRepetido('')
            setErrorLongitudNombre('')
        } else {
            setBordeInput('3px solid red')
            setDisplayCondiciones('')
            if (nombreCanalNuevo.length > 23 ||
                nombreCanalNuevo.length < 3) {
                setErrorLongitudNombre('El nombre ingresado debe tener entre 3 y 23 (inclusive) caracteres.')
                setErrorNombreRepetido('')
            }
            if (estaRepetido) {
                setErrorNombreRepetido('EL NOMBRE INGRESADO PERTENECE A UN CANAL EXISTENTE')
                setErrorLongitudNombre('')
            }
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
        setDisplayCondiciones('none')
        setBordeInput('')
    }

    return (
        <>
            <div className='especial' onClick={handleMostrarInput} style={mostrarInput ? { cursor: 'pointer' } : { cursor: '' }}>
                <form className='formCrearCanal' onSubmit={handleSubmit}>
                    <label style={{ display: mostrarLabel, cursor: 'pointer' }} htmlFor='nuevoCanal'>Crear canal</label>
                    <input type='text' placeholder='#nuevo-canal' style={{ display: mostrarInput, border: bordeInput }} id='nuevoCanal' name='nuevoCanal'/>
                    <button type='submit' style={{ display: mostrarInput, cursor: 'pointer' }}><GrAdd style={{ width: '20px', height: '20px' }} /></button>
                </form>
                {!mostrarInput && <IoMdClose style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleCerrarInput} />}
            </div>
            <ListaCondiciones displayCondiciones={displayCondiciones} condiciones={[errorLongitudNombre, errorNombreRepetido]} />
        </>
    )
}

export default CrearCanal