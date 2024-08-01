import React from 'react'
import WorkspacePreview from '../WorkspacePreview/WorkspacePreview'

const ListaWorkspacesPreview = ({ workspacesFiltrados }) => {
    return (
        <nav className='SW_nav'>
        {
            workspacesFiltrados.length === 0 ?
                <span className='workspaceNotFound'>
                    No se encontraron resultados
                </span> :
                workspacesFiltrados.map((workspace, index) => {
                    const { titulo, thumbnail, id } = workspace
                    return (
                        <WorkspacePreview titulo={titulo} thumbnail={thumbnail} id={id} key={index} />
                    )
                })
        }
    </nav>
    )
}

export default ListaWorkspacesPreview