import React, { useEffect, useState } from 'react'

import { setLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'

import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import { VscDebugRestart } from "react-icons/vsc";
import FiltrarArray from '../../Components/FiltrarArray/FiltrarArray'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'


const SelectorWorkspace = () => {
    const [WORKSPACES, setWORKSPACES] = useState([])
    const [workspacesFiltrados, setWorkspacesFiltrados] = useState([])

    setLS()

    useEffect(() => {
        if (WORKSPACES.length === 0) {
            setWORKSPACES(traerLS())
        }
        setWorkspacesFiltrados(WORKSPACES)
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
                <ListaWorkspacesPreview workspacesFiltrados={workspacesFiltrados}/>
                <FiltrarArray setArrayFiltrado={setWorkspacesFiltrados} array={WORKSPACES}/>
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