import React from 'react'
import { useParams, NavLink } from 'react-router-dom'

import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import ListaMensajes from '../../Components/ListaMensajes/ListaMensajes'

import { WorkspaceList, WorkspaceFooter, WorkspaceHeader, CanalList} from '../index.js'

import './WorkSpace.css'

const WorkSpace = () => {

    const { id } = useParams() // id es un string

    const WORKSPACES = traerLS()

    const dataWorkspace = WORKSPACES.find((workspace) => {
        return( workspace.id == id ) 
    })

    const { titulo, miembros, canales } = dataWorkspace

    let display = 'none'

    console.log(miembros)

    return (
        <>
            <NavLink to={'/'}>
                <span>volver</span>
            </NavLink>
            <h1>{titulo}</h1>
            <CanalList canales={canales} display={display}/>
            <ListaMensajes />
        </>
    )
}

export default WorkSpace