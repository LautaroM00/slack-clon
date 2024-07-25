import React, { useEffect, useState } from 'react'

import { setLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { WorkspacePreview } from '../index'

import './SelectorWorkspace.css'
import CrearWorkSpace from '../CrearWorkSpace/CrearWorkSpace'
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

    const handleReiniciar = () => {
        localStorage.clear()
    }

    const handleCrearWorkspace = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <main className='SW_main'>
            <h1>
                Workspaces
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
            </main>
            <footer className='SW_footer'>
                <NavLink to={'/workspace/new'}>
                    <div className='nuevoWS'>
                        Nuevo Workspace
                    </div>
                </NavLink>
                <form onSubmit={handleReiniciar} className='reiniciar'>
                    <button type='submit' className='boton'><VscDebugRestart style={{width: '30px', height: '30px'}}/></button>
                </form>
            </footer>
        </>
    )
}

export default SelectorWorkspace