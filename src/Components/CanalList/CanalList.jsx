import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'
import FiltrarArray from '../FiltrarArray/FiltrarArray';
import Pepe from '../Pepe/Pepe';
import useFetch from '../../Hooks/useFetch';
import { useWorkspaceContext } from '../../Context/WorkspaceContext';

const CanalList = ({ channels, setChannels }) => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [display, setDisplay] = useState('')
    const [filteredChannels, setCanalesFiltrados] = useState()

    useEffect(() => {
        window.innerWidth >= 700 ?
            setMostrarCanales('') :
            ''
    }
        ,
        [mostrarCanales])

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
                <div className='contenedorFilter'>
                    <FiltrarArray setArrayFiltrado={setCanalesFiltrados} array={channels} />
                </div>
                {
                    !channels ?
                        <ul className='canalNotFound'>
                            Cargando...
                        </ul> :
                        <ul>
                            {
                                channels.length > 0 ?
                                    filteredChannels ?
                                        filteredChannels.length > 0 ?
                                            <CanalMap channels={filteredChannels} /> :
                                            <span className='canalNotFound'>
                                                No se encontraron resultados.
                                            </span> :
                                        <CanalMap channels={channels} /> :
                                    <span className='canalNotFound'>
                                        Este workspace no contiene canales.
                                    </span>
                            }
                        </ul>}
                <CrearCanal display={display} setDisplay={setDisplay} setChannels={setChannels} />
            </nav >
            {
                mostrarCanales ?
                    <div className='displayCanales'>
                        < SlLayers onClick={handleDisplayCanales} style={{ width: '30px', height: '30px', color: 'whitesmoke' }
                        } className='botones' />
                    </div > :
                    <div className='displayCanales'>
                        <IoMdClose onClick={handleDisplayCanales} style={{ width: '30px', height: '30px', color: 'whitesmoke' }} className='botones' />
                    </div>
            }
            <Pepe display={mostrarCanales} setMostrarCanales={setMostrarCanales} />
        </>
    )
}

export default CanalList





const CanalMap = ({ channels }) => {

    const { workspaceName, idCanal } = useParams()
    const { customFetch } = useFetch()
    const { setChannels } = useWorkspaceContext()

    const handleDeleteChannel = async (name, id) => {
        if (confirm(`¿Realmente quiere eliminar el canal '${name.toUpperCase()}?'`)) {

            const serverResponse = await customFetch(`/api/channel/delete/${workspaceName}/${id}`, 'PUT')

            if (serverResponse.ok) {
                setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== id))
                return alert(serverResponse.message)
            } else {
                return alert(serverResponse.message)
            }
        }
    }


    return (
        channels.map((canal, index) => {
            const { name, id } = canal
            return (
                <li key={index} className='canal' style={{ backgroundColor: Number(idCanal) === canal.id ? '#dfdf72' : '#e2e2b6' }} >
                    <NavLink to={`/workspace/${workspaceName}/${id}`}>
                        {`#${name}`}
                    </NavLink>
                    <span className='delete' onClick={() => handleDeleteChannel(name, id)}>
                        x
                    </span>
                </li>
            )
        })
    )
}
