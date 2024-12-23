import React, { useEffect, useState } from 'react'


import './SelectorWorkspace.css'
import { NavLink } from 'react-router-dom'
import FiltrarArray from '../../Components/FiltrarArray/FiltrarArray'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'
import { useAuthContext } from '../../Context/AuthenticationContext'
import useMovement from '../../Hooks/useMovement'


const SelectorWorkspace = ({ hide }) => {
    const { workspaces, adminWorkspaces } = useWorkspaceContext()
    const { logout } = useAuthContext()
    const [workspacesFiltrados, setWorkspacesFiltrados] = useState(workspaces)
    const { movement, displayButton, handleMovement } = useMovement()


    useEffect(() => {
        setWorkspacesFiltrados(workspaces)
    },
        [workspaces]
    )


    const handleLogout = () => {
        if (confirm('¿Desea cerrar sesión?')) {
            logout()
        }
    }

    return (
        <>
            <main className='SW_main'>
                <h1>
                    Bienvenido a Slack!
                </h1>
                <FiltrarArray setArrayFiltrado={setWorkspacesFiltrados} array={workspaces} className={'filtro'} />
                {
                    hide ? <ListaWorkspacesPreview workspacesFiltrados={[]} workspaces={[]} /> :
                        <ListaWorkspacesPreview workspacesFiltrados={workspacesFiltrados} workspaces={workspaces} />
                }
                <footer className={'SW_footer ' + movement}>
                    <button onClick={handleMovement} className='desplazar' style={{ display: displayButton }}>
                        Menu
                    </button>
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
                            <NavLink to={'/workspace/deleteMember'} >
                                <div className='buttonWS' style={{ backgroundColor: 'red' }}>
                                    Eliminar miembros
                                </div>
                            </NavLink>

                        </>
                    }
                    <span onClick={handleLogout} className='buttonWS logout' >
                        Cerrar Sesión
                    </span>
                </footer>
            </main>
        </>
    )
}

export default SelectorWorkspace