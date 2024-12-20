import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { SlLayers } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

import './CanalList.css'
import CrearCanal from '../CrearCanal/CrearCanal'
import FiltrarArray from '../FiltrarArray/FiltrarArray';
import Pepe from '../Pepe/Pepe';
import useFetch from '../../Hooks/useFetch';
import { useModalContext } from '../../Context/ModalContext';
import { useChannelContext } from '../../Context/ChannelContext';

const CanalList = ({ channels }) => {
    const [mostrarCanales, setMostrarCanales] = useState('none')
    const [display, setDisplay] = useState('')
    const [filteredChannels, setCanalesFiltrados] = useState()
    const { isAdmin } = useChannelContext()

    useEffect(() => {
        window.innerWidth >= 700 && setMostrarCanales('')
    },
        [mostrarCanales])

    const handleDisplayCanales = () => {
        mostrarCanales === '' ? setMostrarCanales('none') : setMostrarCanales('')
    }

    const buttonProps = {
        onClick: handleDisplayCanales,
        style: { width: '30px', height: '30px', color: 'whitesmoke' },
        className: 'botones'
    }

    return (
        <>
            <nav style={{ display: mostrarCanales }} className='navCanales'>
                <h2>
                    Canales
                </h2>
                <FiltrarArray setArrayFiltrado={setCanalesFiltrados} array={channels} className={'contenedorFilter'} />
                {
                    channels ?
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
                        </ul> :
                        <ul className='canalNotFound'>
                            Cargando...
                        </ul>
                }
                {
                    isAdmin && <CrearCanal display={display} setDisplay={setDisplay} />
                }
            </nav >
            {
                mostrarCanales ?
                    <div className='displayCanales'>
                        < SlLayers {...buttonProps}/>
                    </div > :
                    <div className='displayCanales'>
                        <IoMdClose {...buttonProps} />
                    </div>
            }
            <Pepe display={mostrarCanales} setMostrarCanales={setMostrarCanales} />
        </>
    )
}

export default CanalList





const CanalMap = ({ channels }) => {
    const { customFetch } = useFetch()
    const { workspaceName, idCanal } = useParams()
    const { setChannels, isAdmin } = useChannelContext()
    const { showModal } = useModalContext()


    const handleDeleteChannel = async (name, id) => {
        if (confirm(`¿Realmente quiere eliminar el canal '${name.toUpperCase()}?'`)) {

            const serverResponse = await customFetch(`/api/channel/delete/${workspaceName}/${id}`, 'PUT')

            if (serverResponse.ok) {
                setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== id))
                showModal({
                    message: serverResponse.message,
                    type: 'success'
                })
                return
            } else {
                showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
                return
            }
        }
    }


    return (
        channels.map((canal, index) => {
            const { name, id } = canal
            return (
                <li key={index} className='canalLi' style={{ backgroundColor: Number(idCanal) === canal.id ? '#dfdf72' : '#e2e2b6' }} >
                    <NavLink to={`/workspace/${workspaceName}/${id}`}>
                        {`#${name}`}
                    </NavLink>
                    {
                        isAdmin &&
                        <span className='delete' onClick={() => handleDeleteChannel(name, id)}>
                            x
                        </span>
                    }
                </li>
            )
        })
    )
}
