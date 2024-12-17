import React from 'react'

import './Mensaje.css'
import ResaltarTexto from '../Funcionalidades/ResaltarTexto/ResaltarTexto'

const Mensaje = ({ name, content, sent_at, textoFiltro }) => {
    return (
        <div className='mensajeContenedor'>
            <div className='arriba'>
                <img src={'/thumbnails/pepe.png'} />
                <div className='nombre-hora'>
                    <h3>
                        {name}
                    </h3>
                    <span>
                        {sent_at}
                    </span>
                </div>
            </div>
            <p className='texto'>
                {
                    textoFiltro ?
                        <ResaltarTexto texto={content} textoFiltro={textoFiltro} /> :
                        content
                }
            </p>
        </div>
    )
}

export default Mensaje