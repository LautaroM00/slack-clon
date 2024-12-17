import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

import './FiltrarArray.css'
import { IoMdClose } from 'react-icons/io';

const FiltrarArray = ({ setArrayFiltrado, array }) => {
    const [mostrarInput, setMostrarInput] = useState('none')
    const [letrasFiltro, setLetrasFiltro] = useState('')

    useEffect(() => {
        if (mostrarInput === 'none') {
            setLetrasFiltro('')
        }
    },
        [mostrarInput])

    const handleDisplayInput = () => {
        setMostrarInput('')
    }

    const handleCloseInput = () => {
        setMostrarInput('none')
        setArrayFiltrado(undefined)
    }

    const handleFiltro = (e) => {

        let textoFiltro = e.target.value

        setLetrasFiltro(textoFiltro)

        const arrayFiltrado = array.filter((elemento) => {
            return (elemento.name.toLowerCase().includes(textoFiltro.toLowerCase()))
        })
        setArrayFiltrado(arrayFiltrado)

        if (!textoFiltro) {
            setArrayFiltrado(undefined)
        }
    }

    return (

        <div className='lupita-input'>
            <IoSearchSharp style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleDisplayInput} />
            <div style={{ display: mostrarInput }} className='input'>
                <input id='filtro' className='inputFiltro' onChange={handleFiltro} />
                <IoMdClose onClick={handleCloseInput} style={{ cursor: 'pointer' }} value={letrasFiltro} />
            </div>
        </div>
    )
}

export default FiltrarArray