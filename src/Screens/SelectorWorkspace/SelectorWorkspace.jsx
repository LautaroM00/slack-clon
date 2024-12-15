import React, { useEffect, useState } from 'react'


import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import FiltrarArray from '../../Components/FiltrarArray/FiltrarArray'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'


const SelectorWorkspace = () => {
    const {workspaces} = useWorkspaceContext()
    const [workspacesFiltrados, setWorkspacesFiltrados] = useState(workspaces)

    useEffect(() => {
        setWorkspacesFiltrados(workspaces)
    },
[workspaces]
)

    return (
        <>
            <main className='SW_main'>
                <h1>
                    Bienvenido a Slack!
                </h1>
                <ListaWorkspacesPreview workspacesFiltrados={workspacesFiltrados}/>
                <FiltrarArray setArrayFiltrado={setWorkspacesFiltrados} array={workspaces}/>
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