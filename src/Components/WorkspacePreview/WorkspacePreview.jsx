import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxEnter } from "react-icons/rx";

import './WorkspacePreview.css'

const WorkspacePreview = ({ titulo, thumbnail, id }) => {
    return (
        <>
            <div className='WorkspacePreview'>
                <div className='izquierda'>
                    <img src={thumbnail} />
                    <h2>{titulo}</h2>
                </div>
                <NavLink to={`/workspace/${id}/1`} className={'navLink'}>
                    Entrar
                </NavLink>
            </div>
        </>
    )
}

export default WorkspacePreview