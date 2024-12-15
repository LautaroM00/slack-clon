import React from 'react';
import { NavLink } from 'react-router-dom';

import './WorkspacePreview.css'

const WorkspacePreview = ({ name, thumbnail, id }) => {
    return (
        <>
            <div className='WorkspacePreview'>
                <div className='izquierda'>
                    <img src={thumbnail} />
                    <h2>{name}</h2>
                </div>
                <NavLink to={`/workspace/${id}/1`} className={'navLink'}>
                    Entrar
                </NavLink>
            </div>
        </>
    )
}

export default WorkspacePreview