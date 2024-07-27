import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

import './FiltrarArray.css'
import { IoMdClose } from 'react-icons/io';

const FiltrarArray = ({ setArrayFiltrado, array}) => {
    const [mostrarInput, setMostrarInput] = useState('none')

    const handleDisplayInput = () => {
        setMostrarInput('')
    }

    const handleCloseInput = () => {
        setMostrarInput('none')
    }

    const handleFiltro = (e) => {

        let textoFiltro = e.target.value

        const arrayFiltrado = array.filter((elemento) => {
            return (elemento.titulo.toLowerCase().includes(textoFiltro.toLowerCase()))
        })
        setArrayFiltrado(arrayFiltrado)
    }

    return (
        <div className='contenedorFilter'>
            <div className='lupita-input'>
                <IoSearchSharp style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={handleDisplayInput}/>
                <div style={{ display: mostrarInput }} className='input'>
                    <input id='filtroCanales' className='inputFiltroCanales' onChange={handleFiltro} />
                    <IoMdClose onClick={handleCloseInput} style={{cursor:'pointer'}}/>
                </div>
            </div>
        </div>
    )
}

export default FiltrarArray