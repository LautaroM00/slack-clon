import React from 'react'

import './CrearWorkSpace.css'
import { actualizarLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import WORKSPACES from '../../WORKSPACES'
import SelectorWorkspace from '../SelectorWorkspace/SelectorWorkspace'
import { NavLink } from 'react-router-dom'

const CrearWorkSpace = ({ setWORKSPACES }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!(e.target['nombreWorkspace'].value === '') && !(e.target['nombreCanal'].value === '')) {
            const WORKSPACES = traerLS()

            WORKSPACES.push({
                titulo: e.target['nombreWorkspace'].value,
                thumbnail: '/iconos/workspacePredeterminado.png',
                canales: [
                    {
                        titulo: e.target['nombreCanal'].value,
                        miembros: [
                            {
                                nombre: 'Lautaro',
                                thumbnail: '/thumbnails/yo.png',
                                mensajesCanal: '.',
                                id: 1
                            }],
                        mensajes: [{
                            autor: 'Lautaro',
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
            /*             setWORKSPACES(WORKSPACES) */

            actualizarLS(WORKSPACES)
        }
    }

    return (
        <>
            <div className='contenedorCW'>
                <form onSubmit={handleSubmit} className='crearWorkspace'>
                    <div className='label-input'>
                        <label htmlFor='nombreWorkspace'>Nombre Workspace:</label>
                        <input type='text' id='nombreWorkspace' name='nombreWorkspace' />
                    </div>
                    <div className='label-input'>
                        <label htmlFor='nombreCanal'>Nombre Canal:</label>
                        <input type='text' id='nombreCanal' name='nombreCanal' />
                    </div>
                    <div className='botones'>
                        <button type='submit'>Crear</button>
                        <NavLink to={'/'} className='salir'>
                                Salir
                        </NavLink>
                    </div>
                    
                </form>
            </div>
            <div className='sombra'>
            </div>
            <SelectorWorkspace />
        </>
    )
}

export default CrearWorkSpace