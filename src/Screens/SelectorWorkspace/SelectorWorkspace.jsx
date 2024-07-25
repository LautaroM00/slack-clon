import React, { useEffect, useState } from 'react'

import { setLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { WorkspacePreview } from '../index'

import './SelectorWorkspace.css'
import CrearWorkSpace from '../CrearWorkSpace/CrearWorkSpace'
import { NavLink } from 'react-router-dom'

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
            <header className='SW_header'>
                Bienvenido!
            </header>
            <main className='SW_main'>
            NATALIA CUERNO
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
                <form onSubmit={handleReiniciar}>
                    <button type='submit'>REINICIAR</button>
                </form>
            </footer>
        </>
    )
}

export default SelectorWorkspace