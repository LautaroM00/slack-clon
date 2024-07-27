import React, { useEffect, useState } from 'react'

import { setLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { WorkspacePreview } from '../index'

import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import { VscDebugRestart } from "react-icons/vsc";


const SelectorWorkspace = () => {
    const [WORKSPACES, setWORKSPACES] = useState([])

    setLS()

    useEffect(() => {
        if (WORKSPACES.length === 0) {
            setWORKSPACES(traerLS())
        }
    }, [WORKSPACES])

    const handleReiniciar = (e) => {
        e.preventDefault()
        localStorage.clear()
        setLS()
        let WORKSPACESLS = traerLS()
        setWORKSPACES(WORKSPACESLS)
    }

    return (
        <>
            <main className='SW_main'>
                <h1>
                    Bienvenido a Slack!
                </h1>
                <nav className='SW_nav'>
                    {
                        WORKSPACES.map((workspace, index) => {
                            const { titulo, thumbnail, id } = workspace
                            return (
                                <WorkspacePreview titulo={titulo} thumbnail={thumbnail} id={id} key={index} />
                            )
                        })
                    }
                </nav>
                <div className='SW_footer'>
                    <NavLink to={'/workspace/new'}>
                        <div className='nuevoWS'>
                            Nuevo Workspace
                        </div>
                    </NavLink>
                </div>
                <form onSubmit={handleReiniciar} className='reiniciar'>
                    <button type='submit' className='boton'><VscDebugRestart style={{ width: '60px', height: '60px' }} /></button>
                </form>
            </main>
        </>
    )
}

export default SelectorWorkspace