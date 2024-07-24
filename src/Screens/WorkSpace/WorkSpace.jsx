import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";



import { traerLS } from '../../FUNCIONES_LOCAL_STORAGE.js'

import { CanalList, Canal } from '../index.js'

import './WorkSpace.css'

const WorkSpace = () => {
    const { id } = useParams() // id es un string

    const WORKSPACES = traerLS()
    const dataWorkspace = WORKSPACES.find((workspace) => {
        return (workspace.id == id)
    })
    const { thumbnail } = dataWorkspace

    return (
        <div className='workspace'>
            <div className='workspace-arriba'>
                    <NavLink to={'/'} className='navLink'>
                        <MdOutlineKeyboardBackspace className='workspaceImg'/>
                        <TfiViewListAlt className='workspaceImg'/>
                    </NavLink>
            </div>
            <Canal />
        </div>
    )
}

export default WorkSpace