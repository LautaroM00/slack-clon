import React from 'react'
import { NavLink } from 'react-router-dom'

import './CanalPreview.css'

const CanalPreview = ({ titulo, thumbnail, id }) => {
    return (
        <div className='CanalPreview'>
            <div className='izquierda'>
                <img src={thumbnail} style={{width: '20px'}}/>
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

export default CanalPreview