import React, { useEffect } from 'react'
import Mensaje from '../Mensaje/Mensaje'

import './ListaMensajes.css'
import { useMessagesContext } from '../../Context/MessageContext'

const ListaMensajes = ({ idCanal, textoFiltro }) => {
    const { messages, setMessages, getMessages } = useMessagesContext()

    useEffect(() => {
        Number(idCanal) && getMessages('all', idCanal)
            .then((messages) => {
                setMessages(messages)
            });
    },
        [idCanal]
    )

    return (
        <div className='contenedorMensajes'>
            {
                messages ?
                    messages.map((mensaje, index) => {
                        const { content, sent_at, name } = mensaje
                        return (
                            <Mensaje name={name} content={content} sent_at={sent_at} key={index} textoFiltro={textoFiltro} />
                        )
                    }) :
                    <h2>Cargando</h2>
            }
        </div>
    )
}

export default ListaMensajes