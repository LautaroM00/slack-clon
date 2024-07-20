import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

import './CanalList.css'
import Canal from '../Canal/Canal'

const CanalList = ({ canales, display }) => {

    return (
        <nav style={{display: display}}>
            <h1>
                Canales
            </h1>
            <ul>
                {canales.map((canal, index) => {
                    const { titulo } = canal
                    return (
                        <Canal titulo={titulo} key={index}/>
                    )
                })}
            </ul>
        </nav>
    )
}

export default CanalList