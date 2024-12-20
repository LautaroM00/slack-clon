import React, { useEffect, useState } from 'react'


import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import FiltrarArray from '../../Components/FiltrarArray/FiltrarArray'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'


const SelectorWorkspace = () => {
    const { workspaces, adminWorkspaces } = useWorkspaceContext()
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
                <ListaWorkspacesPreview workspacesFiltrados={workspacesFiltrados} workspaces={workspaces} />
                <FiltrarArray setArrayFiltrado={setWorkspacesFiltrados} array={workspaces} className={'filtro'} />
                <footer className='SW_footer'>
                    <NavLink to={'/workspace/new'}>
                        <div className='buttonWS'>
                            Nuevo Workspace
                        </div>
                    </NavLink>
                    {
                        adminWorkspaces && adminWorkspaces.length > 0 &&
                        <>
                            <NavLink to={'/workspace/delete'}>
                                <div className='buttonWS' style={{ backgroundColor: '#cc2e2ea4' }}>
                                    Eliminar Workspace
                                </div>
                            </NavLink>
                            <NavLink to={'/workspace/addMember'} >
                                <div className='buttonWS' style={{ backgroundColor: 'green' }}>
                                    Agregar Miembros
                                </div>
                            </NavLink>
                        </>
                    }
                </footer>
            </main>
        </>
    )
}

export default SelectorWorkspace