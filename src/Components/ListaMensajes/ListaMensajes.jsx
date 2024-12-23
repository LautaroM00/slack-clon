import React, { useEffect } from 'react'
import Mensaje from '../Mensaje/Mensaje'

import './ListaMensajes.css'
import { useMessagesContext } from '../../Context/MessageContext'
import useFetch from '../../Hooks/useFetch'
import { useModalContext } from '../../Context/ModalContext'


const ListaMensajes = ({ idCanal, textoFiltro }) => {
    const { messages, setMessages, getMessages } = useMessagesContext()
    const { customFetch } = useFetch()
    const { showModal, handleBackground } = useModalContext()

    useEffect(() => {
        Number(idCanal) && getMessages('all', idCanal)
            .then((messages) => {
                setMessages(messages)
            });
    },
        [idCanal]
    )

    const handleDeleteMessage = async (idMessage) => {
        if(confirm('¿Realmente desea eliminar este mensaje?')){
            handleBackground()
            const serverResponse = await customFetch('/api/message/' + idMessage, 'PUT')

            if(serverResponse.ok){
                setMessages(messages.filter((message) => message.id !== idMessage))
                showModal({
                    message: serverResponse.message,
                    type: 'success'
                })
                return
            }else{
                showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
            }
        }
    }

    return (
        <div className='contenedorMensajes'>
            {
                messages ?
                    messages.map((mensaje, index) => {
                        console.log(mensaje)
                        return (
                            <Mensaje mensaje={mensaje} key={index} textoFiltro={textoFiltro} handleDeleteMessage={handleDeleteMessage} />
                        )
                    }) :
                    <h2>Cargando</h2>
            }
        </div>
    )
}

export default ListaMensajes