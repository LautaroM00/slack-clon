import React, { createContext, useContext, useState } from 'react'
import ModalMensaje from '../Components/ModalMensaje/ModalMensaje'
import ModalBackground from '../Components/ModalMensaje/ModalBackground'


const ModalContext = createContext()

const ModalProvider = ({ children }) => {
    const [displayBackground, setDisplayBackground] = useState('')
    const [modalData, setModalData] = useState()
    const [show, setShow] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const showModal = (data) => {
        setShow(true)
        setModalData(data)
    }

    const handleBackground = () => {
        setShowBackground(true)
        setDisplayBackground('')
    }

    return (
        <ModalContext.Provider value={{
            showModal,
            handleBackground
        }}>
            {
                show && <ModalMensaje modalData={modalData} setShow={setShow} setDisplayBackground={setDisplayBackground} setShowBackground={setShowBackground}/>
            }
            {
                showBackground && <ModalBackground displayBackground={displayBackground} show={show}/>
            }
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)

export default ModalProvider