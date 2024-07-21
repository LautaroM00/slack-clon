import React from 'react'

import './Mensaje.css'

const Mensaje = ({ autor, texto, hora, thumbnail}) => {
    return (
        <div className='mensajeContenedor'>
            <div className='arriba'>
                <img src={thumbnail}/>
                <div className='nombre-hora'>
                    <h3>
                        {autor}
                    </h3>
                    <span>
                        {hora}
                    </span>
                </div>
            </div>
            <div className='abajo'>
                <p className='texto'>
                    {texto}
                </p>
            </div>
        </div>
    )
}

export default Mensaje