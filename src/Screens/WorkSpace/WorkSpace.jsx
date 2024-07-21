import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'

import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE.js'

import { WorkspaceList, WorkspaceFooter, WorkspaceHeader, CanalList, Canal } from '../index.js'

import './WorkSpace.css'

const WorkSpace = () => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [valueCanalList, setValueCanalList] = useState('Canales')

    const { id } = useParams() // id es un string


    const WORKSPACES = traerLS()
    const dataWorkspace = WORKSPACES.find((workspace) => {
        return (workspace.id == id)
    })
    const { titulo, canales, thumbnail } = dataWorkspace

    const handleDisplayCanales = () => {
        if(mostrarCanales === 'none'){
            setMostrarCanales('')
            setValueCanalList('Cerrar')
        }else{
            setMostrarCanales('none')
            setValueCanalList('Canales')
        }
    }

    return (
        <>
            <CanalList canales={canales} display={mostrarCanales} />
            <div className='workspace-arriba'>
                <div>
                    <NavLink to={'/'}>
                        <span>volver</span>
                    </NavLink>
                    <img src={thumbnail} className='workspaceImg' />
                </div>
                <button onClick={handleDisplayCanales}>{valueCanalList}</button>
            </div>
            <Canal canales={canales} />
        </>
    )
}

export default WorkSpace