import React from 'react'
import WorkspacePreview from '../WorkspacePreview/WorkspacePreview'

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
                    <h1 className='loading'>
                        Cargando...
                    </h1>
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