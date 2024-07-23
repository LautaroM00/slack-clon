import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'

const CanalList = ({ canales, display }) => {

    const idParams = useParams()

    const { id } = idParams

    return (
        <>
            <nav style={{ display: display }} className='navCanales'>
                <h1>
                    Canales
                </h1>
                <ul>
                    {canales.map((canal, index) => {
                        const { titulo, id_canal } = canal
                        return (
                            <NavLink key={index} to={`/workspace/${id}/${id_canal}`}>
                                <li>
                                    {`#${titulo}`}
                                </li>
                            </NavLink>
                        )
                    })}
                </ul>
                <CrearCanal />
            </nav>
        </>
    )
}

export default CanalList