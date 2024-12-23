import React from 'react'
import WorkspacePreview from '../WorkspacePreview/WorkspacePreview'
import { ProgressSpinner } from 'primereact/progressspinner'

const ListaWorkspacesPreview = ({ workspacesFiltrados, workspaces }) => {
    return (
        <>
            {workspaces ?
                <nav className='SW_nav'>
                    {workspacesFiltrados ?
                        workspacesFiltrados.length > 0 ?
                            <WorkspacesMap workspaces={workspacesFiltrados} /> :
                            <span className='workspaceNotFound'>
                                No se encontraron resultados
                            </span> :
                        <WorkspacesMap workspaces={workspaces} />}
                </nav> :
                <nav className='SW_nav' style={{ width: '80vw', color: 'white' }}>
                    <div className='loaderMessages'>
                        <ProgressSpinner style={{ width: '200px', height: '200px' }} strokeWidth="2" />
                    </div>
                </nav>
            }
        </>
    )
}

const WorkspacesMap = ({ workspaces }) => {
    return (
        workspaces.map((workspace, index) => {
            const { name, id } = workspace
            return (
                <WorkspacePreview name={name} thumbnail={'/iconos/workspacePredeterminado.png'} id={id} key={index} />
            )
        })
    )
}


export default ListaWorkspacesPreview