import React from 'react'
import { useParams } from 'react-router-dom'

import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import ListaMensajes from '../../Components/ListaMensajes/ListaMensajes'

import { WorkspaceList, WorkspaceFooter, WorkspaceHeader} from '../index.js'

import './WorkSpace.css'

const WorkSpace = () => {

    const { id } = useParams() // id es un string

    const WORKSPACES = traerLS()

    const dataWorkspace = WORKSPACES.find((workspace) => {
        return( workspace.id == id ) 
    })

    const { titulo, miembros } = dataWorkspace

    return (
        <>
            <ListaMensajes />
        </>
    )
}

export default WorkSpace