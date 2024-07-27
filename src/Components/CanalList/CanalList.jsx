import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'

const CanalList = ({ canales, setCanalesState }) => {
    const [mostrarCanales, setMostrarCanales] = useState('')
    const [display, setDisplay] = useState('')

    const handleDisplayCanales = () => {
        if (mostrarCanales === '') {
            setMostrarCanales('none')
        } else {
            setMostrarCanales('')
        }
    }

    const idParams = useParams()

    const { id } = idParams

    return (
        <>
            <nav style={{ display: mostrarCanales }} className='navCanales'>
                <h2>
                    Canales
                </h2>
                <ul>
                    {canales.map((canal, index) => {
                        const { titulo, id_canal } = canal
                        return (
                            <NavLink key={index} to={`/workspace/${id}/${id_canal}`}>
                                <li className='canal'>
                                    {`#${titulo}`}
                                </li>
                            </NavLink>
                        )
                    })}
                </ul>
                <CrearCanal display={display} setDisplay={setDisplay} setCanalesState={setCanalesState} />
            </nav>
            {
                mostrarCanales ?
                    <div className='displayCanales'>
                        <SlLayers onClick={handleDisplayCanales} style={{ width: '30px', height: '30px', color: 'whitesmoke' }} className='botones' />
                    </div> :
                    <div className='displayCanales'>
                        <IoMdClose onClick={handleDisplayCanales} style={{ width: '30px', height: '30px', color: 'whitesmoke' }} className='botones' />
                    </div>
            }
        </>
    )
}

export default CanalList