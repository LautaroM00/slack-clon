import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'

import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE.js'

import { CanalList, Canal } from '../index.js'

import './WorkSpace.css'

const WorkSpace = () => {
    const { id } = useParams() // id es un string

    const WORKSPACES = traerLS()
    const dataWorkspace = WORKSPACES.find((workspace) => {
        return (workspace.id == id)
    })
    const { canales, thumbnail } = dataWorkspace

    return (
        <>
            <CanalList canales={canales}/>
            <div className='workspace-arriba'>
                <div>
                    <NavLink to={'/'}>
                        <span>volver</span>
                    </NavLink>
                    <img src={thumbnail} className='workspaceImg' />
                </div>
            </div>
            <Canal/>
        </>
    )
}

export default WorkSpace