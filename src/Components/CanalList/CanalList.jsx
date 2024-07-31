import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'
import FiltrarArray from '../FiltrarArray/FiltrarArray';
import Pepe from '../Pepe/Pepe';

const CanalList = ({ canales, setCanalesState, setTextoFiltro }) => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [display, setDisplay] = useState('')
    const [canalesFiltrados, setCanalesFiltrados] = useState([])

    const idParams = useParams()
    const { id, idCanalParams } = idParams
    const canalActual = canales.find((canal) => {
        return (canal.id_canal === Number(idCanalParams))
    })

    useEffect(() => {
        setCanalesFiltrados(canales)
        window.innerWidth >= 700 ?
            setMostrarCanales('') :
            ''
    }
        ,
        [canales, mostrarCanales])

    const resetTextoFiltro = () => {
        setTextoFiltro('')
    }

    const handleDisplayCanales = () => {
        if (mostrarCanales === '') {
            setMostrarCanales('none')
        } else {
            setMostrarCanales('')
        }
    }

    return (
        <>
            <nav style={{ display: mostrarCanales }} className='navCanales'>
                <h2>
                    Canales
                </h2>
                <FiltrarArray setArrayFiltrado={setCanalesFiltrados} array={canales} />
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
                                            <li className='canal' style={{
                                                backgroundColor: '#dfdf72'}} onClick={resetTextoFiltro}>
                                                {`#${titulo}`}
                                            </li> :
                                            <li className='canal' onClick={resetTextoFiltro}>
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
            <Pepe display={mostrarCanales} setMostrarCanales={setMostrarCanales} />
        </>
    )
}

export default CanalList