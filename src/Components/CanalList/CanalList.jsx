import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'

const CanalList = ({ canales }) => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [display, setDisplay] = useState('')

    const handleDisplayCanales = () => {
        if (mostrarCanales === 'none') {
            setMostrarCanales('')
        } else {
            setMostrarCanales('none')
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
                <div className='especial'><CrearCanal display={display} setDisplay={setDisplay} /></div>
            </nav>
            {
                mostrarCanales ?
                    <div className='displayCanales'>
                        <SlLayers onClick={handleDisplayCanales} style={{ width: '30px', height: '30px' }}/>
                    </div> :
                    <div className='displayCanales'>
                        <IoMdClose onClick={handleDisplayCanales} style={{ width: '30px', height: '30px' }} />
                    </div>

            }

        </>
    )
}

export default CanalList