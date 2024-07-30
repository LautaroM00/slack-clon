import React from 'react'

import { AiOutlineQuestionCircle } from "react-icons/ai";

import './InformacionInput.css'


const InformacionInput = ({ setCondiciones, displayCondiciones }) => {

    const handleDisplay = () => {
        displayCondiciones ?
        setCondiciones('') : 
        setCondiciones('none')
    }

    return (
        <div className='contenedorQuestion'>
            <AiOutlineQuestionCircle className='question' onClick={handleDisplay}/>
        </div>
    )
}

export default InformacionInput