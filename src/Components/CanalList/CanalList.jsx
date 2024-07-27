import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'
import FiltrarArray from '../FiltrarArray/FiltrarArray';

const CanalList = ({ canales, setCanalesState }) => {
    const [mostrarCanales, setMostrarCanales] = useState('')
    const [display, setDisplay] = useState('')
    const [canalesFiltrados, setCanalesFiltrados] = useState([])
    const [textoFiltro, setTextoFiltro] = useState()

    const handleDisplayCanales = () => {
        if (mostrarCanales === '') {
            setMostrarCanales('none')
        } else {
            setMostrarCanales('')
        }
    }

    const idParams = useParams()

    const { id, idCanalParams } = idParams

    const canalActual = canales.find((canal) => {
        return (canal.id_canal === Number(idCanalParams))
    })

    useEffect(() => {
        setCanalesFiltrados(canales)
    }
        ,
        [canales])

    return (
        <>
            <nav style={{ display: mostrarCanales }} className='navCanales'>
                <h2>
                    Canales
                </h2>
                <FiltrarArray setArrayFiltrado={setCanalesFiltrados} array={canales} textoFiltro={textoFiltro}/>
                <ul>
                    {canalesFiltrados.length === 0 ?
                    <span className='canalNotFound'>
                        No se encontraron resultados
                    </span> :
                    canalesFiltrados.map((canal, index) => {
                        const { titulo, id_canal } = canal
                        return (
                            <NavLink key={index} to={`/workspace/${id}/${id_canal}`}>
                                {
                                    canalActual.id_canal === canal.id_canal ?
                                        <li className='canal' style={{ backgroundColor: '#dfdf72' }}>
                                            {`#${titulo}`}
                                        </li> :
                                        <li className='canal'>
                                            {`#${titulo}`}
                                        </li>
                                }
                            </NavLink>
                        )
                    })    
                }
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