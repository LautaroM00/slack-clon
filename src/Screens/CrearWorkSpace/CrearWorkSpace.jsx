import React, { useEffect, useState } from 'react'

import './CrearWorkSpace.css'
import { actualizarLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import WORKSPACES from '../../WORKSPACES'
import SelectorWorkspace from '../SelectorWorkspace/SelectorWorkspace'
import { NavLink } from 'react-router-dom'
import InformacionInput from '../../Components/InformacionInput/InformacionInput'
import ListaCondiciones from '../../Components/ListaCondiciones/ListaCondiciones'

const CrearWorkSpace = ({ setWORKSPACES }) => {
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [inputInvalido, setInputInvalido] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        let nombreWorkspace = e.target['nombreWorkspace'].value
        let nombreCanal = e.target['nombreCanal'].value

        if (nombreWorkspace !== ''      &&
            nombreCanal !== ''          &&
            nombreWorkspace.length < 20 &&
            nombreWorkspace.length > 5  &&
            nombreCanal.length < 24     &&
            nombreCanal.length > 2) {

            setInputInvalido('')
            setDisplayCondiciones('none')

            const WORKSPACES = traerLS()
            WORKSPACES.push({
                titulo: nombreWorkspace,
                thumbnail: '/iconos/workspacePredeterminado.png',
                canales: [
                    {
                        titulo: nombreCanal,
                        miembros: [
                            {
                                nombre: 'Tú',
                                thumbnail: '/thumbnails/chad.png',
                                mensajesCanal: '.',
                                id: 1
                            }],
                        mensajes: [{
                            autor: 'Tú',
                            texto: 'holaa',
                            hora: '19:57',
                            id: 1
                        }],
                        id_canal: 1
                    },
                ],
                contactos: [],
                id: WORKSPACES.length + 1
            })
            e.target['nombreWorkspace'].value = ''
            e.target['nombreCanal'].value = ''
            actualizarLS(WORKSPACES)

        }else{
            setInputInvalido('4px solid red')
            setDisplayCondiciones('')
        }
    }

    return (
        <>
            <div className='contenedorCW'>
                <form onSubmit={handleSubmit} className='crearWorkspace'>
                    <div className='label-input'>
                        <label htmlFor='nombreWorkspace'>Nombre Workspace:</label>
                        <input type='text' id='nombreWorkspace' name='nombreWorkspace' style={{border: inputInvalido}} />
                    </div>
                    <div className='label-input'>
                        <label htmlFor='nombreCanal'>Nombre Canal:</label>
                        <input type='text' id='nombreCanal' name='nombreCanal' style={{border: inputInvalido}}/>
                    </div>
                    <div className='botones'>
                        <button type='submit'>Crear</button>
                        <NavLink to={'/'} className='salir'>
                            Salir
                        </NavLink>
                        <InformacionInput setCondiciones={setDisplayCondiciones} displayCondiciones={displayCondiciones}/>
                    </div>
                </form>
                <ListaCondiciones displayCondiciones={displayCondiciones} 
                condiciones={[
                    'Workspace: entre 5 y 20 caracteres',
                    'Canal: entre 3 y 23 caracteres'
                ]} />
            </div>
            <div className='sombra'>
            </div>
            <SelectorWorkspace />
        </>
    )
}

export default CrearWorkSpace