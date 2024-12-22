import React from 'react'

import './Mensaje.css'
import ResaltarTexto from '../Funcionalidades/ResaltarTexto/ResaltarTexto'

const Mensaje = ({ mensaje, textoFiltro, handleDeleteMessage }) => {

    const { content, sent_at, name, id, owner } = mensaje

    return (
        <div className='mensajeContenedor'>

            <div className='arriba'>
                <img src={'/thumbnails/pepe.png'} />
                <div className='nombre-hora'>
                    <h3>
                        {name}
                    </h3>
                    {
                        owner && <span className='delete' onClick={() => handleDeleteMessage(id)}>
                            ❌
                        </span>
                    }
                </div>
            </div>
            <p className='texto'>
                {
                    textoFiltro ?
                        <ResaltarTexto texto={content} textoFiltro={textoFiltro} /> :
                        content
                }
            </p>
            <span className='hora'>
                {sent_at}
            </span>
        </div>
    )
}

export default Mensaje