import React from 'react'

import './CrearWorkSpace.css'
import { actualizarLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import WORKSPACES from '../../WORKSPACES'

const CrearWorkSpace = ({ setWORKSPACES }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if(!(e.target['nombreWorkspace'].value === '') && !(e.target['nombreCanal'].value === '') ){
            const WORKSPACES = traerLS()

            console.log(e.target['nombreWorkspace'].value)
            
            WORKSPACES.push(    {
                titulo: e.target['nombreWorkspace'].value,
                thumbnail: '/iconos/gowGrecia.png',
                canales: [
                    {
                        titulo: e.target['nombreCanal'].value,
                        miembros: [],
                        mensajes: [],
                        id_canal: 1
                    },
                ],
                contactos: [],
                id: WORKSPACES.length + 1
            })
    
            setWORKSPACES(WORKSPACES)
    
            actualizarLS(WORKSPACES)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='crearWorkspace'>
            <label htmlFor='nombreWorkspace'>Nombre Workspace:</label>
            <input type='text' id='nombreWorkspace' name='nombreWorkspace'/>
            <label htmlFor='nombreCanal'>Nombre Canal:</label>
            <input type='text' id='nombreCanal' name='nombreCanal'/>
            <button>Crear</button>
        </form>
    )
}

export default CrearWorkSpace