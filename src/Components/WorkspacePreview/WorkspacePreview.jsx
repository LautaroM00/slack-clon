import React from 'react'
import { NavLink } from 'react-router-dom'

import './WorkspacePreview.css'

const WorkspacePreview = ({ titulo, thumbnail, id }) => {
    return (
        <div className='WorkspacePreview'>
            <div className='izquierda'>
                <img src={thumbnail} style={{width: '60px', borderRadius: '50%'}}/>
                <h2>{titulo}</h2>
            </div>
            <NavLink to={`/workspace/${id}`}>
                <button>
                    Entrar
                </button>
            </NavLink>

        </div>
    )
}

export default WorkspacePreview