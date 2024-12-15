import React, { useEffect, useState } from 'react'


import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import { VscDebugRestart } from "react-icons/vsc";
import FiltrarArray from '../../Components/FiltrarArray/FiltrarArray'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'
import useFetch from '../../Hooks/useFetch';


const SelectorWorkspace = () => {
    const [WORKSPACES, setWORKSPACES] = useState([])
    const [workspacesFiltrados, setWorkspacesFiltrados] = useState([])
    const {customFetch} = useFetch()

    const getUserWorkspaces = async () => {

        const serverResponse = await customFetch('/api/workspace/', 'GET')

        console.log(serverResponse)
    }

    getUserWorkspaces()

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
            </main>
        </>
    )
}

export default SelectorWorkspace