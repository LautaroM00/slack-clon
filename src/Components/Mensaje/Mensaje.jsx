import React from 'react'

import './Mensaje.css'
import ResaltarTexto from '../Funcionalidades/ResaltarTexto/ResaltarTexto'

const Mensaje = ({ autor, texto, hora, thumbnail, textoFiltro }) => {
    return (
        <div className='mensajeContenedor'>
            <div className='arriba'>
                <img src={thumbnail} />
                <div className='nombre-hora'>
                    <h3>
                        {autor}
                    </h3>
                    <span>
                        {hora}
                    </span>
                </div>
            </div>
            <p className='texto'>
                {
                    textoFiltro ?
                        <ResaltarTexto texto={texto} textoFiltro={textoFiltro} /> :
                        texto
                }
            </p>
        </div>
    )
}

export default Mensaje