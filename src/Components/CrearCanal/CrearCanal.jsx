import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { GrAdd } from "react-icons/gr";

import './CrearCanal.css'
import ListaCondiciones from '../ListaCondiciones/ListaCondiciones.jsx';
import { useWorkspaceContext } from '../../Context/WorkspaceContext.jsx';
import useFetch from '../../Hooks/useFetch.jsx';

const CrearCanal = ({ setDisplay }) => {
    const [mostrarInput, setMostrarInput] = useState('none')
    const [mostrarLabel, setMostrarLabel] = useState('')
    const [bordeInput, setBordeInput] = useState('')
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [errorNombreRepetido, setErrorNombreRepetido] = useState('')
    const [errorLongitudNombre, setErrorLongitudNombre] = useState('')

    const {channels, setChannels} = useWorkspaceContext()

    const {customFetch} = useFetch()

    const { workspaceName } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault()

        let nombreCanalNuevo = e.target[0].value.trim()

        let estaRepetido = channels.find((canal) => {
            return (nombreCanalNuevo === canal.name)
        })

        if (nombreCanalNuevo &&
            nombreCanalNuevo.length < 24 &&
            nombreCanalNuevo.length > 2 && !estaRepetido) {

            const serverResponse = await customFetch(`/api/channel/${workspaceName}`, 'POST', { channelName: nombreCanalNuevo})

            if(serverResponse.ok){
                setChannels(undefined)
            } else {
                return alert(serverResponse.message)
            }

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
                setErrorNombreRepetido('El nombre ingresado pertenece a un canal existente.')
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
                    <input type='text' placeholder='nuevo-canal' style={{ display: mostrarInput, border: bordeInput }} id='nuevoCanal' name='nuevoCanal'/>
                    <button type='submit' style={{ display: mostrarInput, cursor: 'pointer' }}><GrAdd style={{ width: '20px', height: '20px' }} /></button>
                </form>
                {!mostrarInput && <IoMdClose style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleCerrarInput} />}
            </div>
            <ListaCondiciones displayCondiciones={displayCondiciones} condiciones={[errorLongitudNombre, errorNombreRepetido]} />
        </>
    )
}

export default CrearCanal