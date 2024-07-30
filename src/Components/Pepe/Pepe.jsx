import React, { useEffect, useState } from 'react'

import './Pepe.css'

const Pepe = ({ display, setMostrarCanales }) => {

    const handleMostrarCanales = () => {
        setMostrarCanales('')
    }

    return (
        <div className='pepe'>
            <h2 style={{textAlign: 'center'}}>
                Con que jugando con el responsive...
            </h2>
            <img src='/thumbnails/pepe.png' style={{width: '50px', height: '50px'}}/>
            <button onClick={handleMostrarCanales}>
                Mostrar canalList
            </button>
        </div>
    )
}

export default Pepe