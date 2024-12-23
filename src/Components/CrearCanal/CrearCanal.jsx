import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdClose } from "react-icons/io";
import { GrAdd } from "react-icons/gr";

import './CrearCanal.css'
import ListaCondiciones from '../ListaCondiciones/ListaCondiciones.jsx';
import useFetch from '../../Hooks/useFetch.jsx';
import { useModalContext } from '../../Context/ModalContext.jsx';
import { useChannelContext } from '../../Context/ChannelContext.jsx';

const CrearCanal = () => {

    const [config, setConfig] = useState({
        showInput: 'none',
        showLabel: '',
        inputBorder: '',
        displayConditions: 'none',
        repeatedName: '',
        tooLargeName: ''
    })

    const { showModal, handleBackground } = useModalContext()

    const { channels, setChannels } = useChannelContext()
    const { customFetch } = useFetch()
    const { workspaceName } = useParams()


    const handleSubmit = async (e) => {
        e.preventDefault()

        let channelName = e.target[0].value.trim()

        let estaRepetido = channels.find((canal) => {
            return (channelName === canal.name)
        })

        if (channelName &&
            channelName.length < 24 &&
            channelName.length > 2 && !estaRepetido) {
                handleBackground()
            const serverResponse = await customFetch(`/api/channel/${workspaceName}`, 'POST', { channelName: channelName })
            if (serverResponse.ok) {
                const canalAgregado = await customFetch(`/api/channel/last/${workspaceName}/${channelName}`, 'GET')
                e.target[0].value = ''
                setConfig({
                    display: 'none',
                    showInput: 'none',
                    showLabel: '',
                    inputBorder: '',
                    displayConditions: 'none',
                    repeatedName: '',
                    tooLargeName: ''
                })
                showModal({
                    message: serverResponse.message,
                    type: 'success'
                })
                const newChannel = canalAgregado.payload.channels
                setChannels((prevChannels) => {
                    if (prevChannels.length > 0) {
                        return [...prevChannels, newChannel[0]]
                    } else {
                        return newChannel
                    }
                })
            } else {
                showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
            }
        } else {
            if (channelName.length > 23 ||
                channelName.length < 3) {
                setConfig({
                    ...config,
                    ['tooLargeName']: 'El nombre ingresado debe tener entre 3 y 23 (inclusive) caracteres.',
                    ['repeatedName']: ''
                })
            }
            if (estaRepetido) {
                setConfig({
                    ...config,
                    ['tooLargeName']: 'El nombre ingresado pertenece a un canal existente.',
                    ['repeatedName']: ''
                })
            }
            setConfig((prevConfig) => {
                return {
                    ...prevConfig,
                    ['inputBorder']: '3px solid red',
                    ['displayConditions']: ''
                }
            })
        }
    }
    const handleMostrarInput = () => {
        if (config.showInput) {
            setConfig({
                ...config,
                ['showInput']: '',
                ['showLabel']: 'none'
            })
        }
    }

    const handleCerrarInput = () => {
        setConfig({
            ...config,
            ['showInput']: 'none',
            ['showLabel']: '',
            ['displayConditions']: 'none',
            ['inputBorder']: ''
        })
    }

    return (
        <>
            <div className='especial' onClick={handleMostrarInput} style={config.showInput ? { cursor: 'pointer' } : { cursor: '' }}>
                <form className='formCrearCanal' onSubmit={handleSubmit}>
                    <label style={{ display: config.showLabel, cursor: 'pointer' }} htmlFor='nuevoCanal'>Crear canal</label>
                    <input type='text' placeholder='nuevo-canal' style={{ display: config.showInput, border: config.inputBorder }} id='nuevoCanal' name='nuevoCanal' />
                    <button type='submit' style={{ display: config.showInput, cursor: 'pointer' }}><GrAdd style={{ width: '20px', height: '20px' }} /></button>
                </form>
                {!config.showInput && <IoMdClose style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleCerrarInput} />}
            </div>
            <ListaCondiciones displayCondiciones={config.displayConditions} condiciones={[config.tooLargeName, config.repeatedName]} />
        </>
    )
}

export default CrearCanal