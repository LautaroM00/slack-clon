import React, { useState } from 'react'
import { TbMessageCircleSearch } from "react-icons/tb";

import './InputFiltroTexto.css'
import { IoMdClose } from 'react-icons/io';

const InputFiltroTexto = ({ setTextoFiltro, textoFiltro, id }) => {
    const [mostrarInput, setMostrarInput] = useState('none')

    const handleDisplayInput = () => {
        setMostrarInput('')
    }

    const handleCloseInput = () => {
        setMostrarInput('none')
        setTextoFiltro('')
    }

    const handleInput = (e) => {
        setTextoFiltro(e.target.value)
    }

    return (
        <div className='contenedorFilterTexto'>
            <div className='lupita-input'>
                <TbMessageCircleSearch className='lupitaTexto' onClick={handleDisplayInput}/>
                <div style={{ display: mostrarInput }} className='input'>
                    <input id={id} name={id} className='inputFiltro' onChange={handleInput} value={textoFiltro} />
                    <IoMdClose onClick={handleCloseInput} style={{ cursor: 'pointer' }} />
                </div>
            </div>
        </div>
    )
}

export default InputFiltroTexto