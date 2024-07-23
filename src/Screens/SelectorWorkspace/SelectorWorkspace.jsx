import React, { useEffect, useState } from 'react'

import { setLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { WorkspacePreview } from '../index'

import './SelectorWorkspace.css'
import CrearWorkSpace from '../CrearWorkSpace/CrearWorkSpace'

const SelectorWorkspace = () => {
    const [WORKSPACES, setWORKSPACES] = useState([])

    setLS()

    useEffect(() => {
        if(WORKSPACES.length === 0){
            setWORKSPACES(traerLS())
        }
    },[WORKSPACES])

    const handleReiniciar = () => {
        localStorage.clear()
    }

    const handleCrearWorkspace = (e) => {
        e.preventDefault()

    }

    return (
        <>
            <header>
                Bienvenido!
            </header>
            <main className='SW_main'>
                Seleccionar
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
                <CrearWorkSpace setWORKSPACES={setWORKSPACES}/>
            </main>
            <footer>
                <form onSubmit={handleReiniciar}>
                    <button type='submit'>REINICIAR</button>
                </form>
                <form onSubmit={handleCrearWorkspace}>
                    <button type='submit'>Nuevo workspace</button>
                </form>
            </footer>
        </>
    )
}

export default SelectorWorkspace