import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'

const CanalList = ({ canales, display }) => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [valueCanalList, setValueCanalList] = useState('Canales')

    const handleDisplayCanales = () => {
        if (mostrarCanales === 'none') {
            setMostrarCanales('')
            setValueCanalList('Cerrar')
        } else {
            setMostrarCanales('none')
            setValueCanalList('Canales')
        }
    }

    const idParams = useParams()

    const { id } = idParams

    return (
        <>
            <nav style={{ display: mostrarCanales }} className='navCanales'>
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
            <button onClick={handleDisplayCanales} className='displayCanales'>{valueCanalList}</button>
        </>
    )
}

export default CanalList