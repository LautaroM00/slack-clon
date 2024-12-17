import React, { useEffect, useState } from 'react'
import Mensaje from '../Mensaje/Mensaje'

import './ListaMensajes.css'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'

const ListaMensajes = ({ idCanal, textoFiltro }) => {

    const { getMessages } = useWorkspaceContext()
    const [messages, setMessages] = useState()

    useEffect(() => {


        getMessages(idCanal)
            .then((messages) => {
                setMessages(() => messages)
            });

    },
        [idCanal]
    )

    return (
        <div className='contenedorMensajes'>
            {
                messages ?
                    messages.map((mensaje, index) => {

                        const { sender_id, content, sent_at, name } = mensaje

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