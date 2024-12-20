import React, { createContext, useContext, useState } from 'react'
import ModalMensaje from '../Components/ModalMensaje/ModalMensaje'


const ModalContext = createContext()

const ModalProvider = ({ children }) => {

    const [modalData, setModalData] = useState()
    const [show, setShow] = useState(false)

    const showModal = (data) => {
        setShow(true)
        setModalData(data)
    }

    return (
        <ModalContext.Provider value={{
            showModal
        }}>
            {
                show && <ModalMensaje modalData={modalData} setShow={setShow} />
            }
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)

export default ModalProvider