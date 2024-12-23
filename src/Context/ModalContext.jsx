import React, { createContext, useContext, useState } from 'react'
import ModalMensaje from '../Components/ModalMensaje/ModalMensaje'
import ModalBackground from '../Components/ModalMensaje/ModalBackground'
import { validateLength } from '../Utils/validations.js'


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


    const checkFields = (formState) => {
        let errors = []
        for (let key in formState) {
            if (!formState[key]) {
                const dictionary = {
                    'name': 'Nombre',
                    'password': 'Contraseña',
                    'passwordRepeat': 'Repita su contraseña',
                    'email': 'Email'
                }
                return {
                    error: true,
                    showModal: () => showModal({
                        message: `El campo '${dictionary[key]}' no puede estar vacío.`,
                        type: 'error'
                    })
                }
            }
            if (['name', 'password'].includes(key)) {
                console.log(key, formState[key])
                const validationResult = validateLength(key, formState[key])
                validationResult && errors.push(validationResult)
            }
        }
        if (errors.find((error) => error.length > 0)) {
            return {
                error: true,
                showModal: () => showModal({
                    message: errors,
                    type: 'validation'
                })
            }
        }

        return null
    }

    return (
        <ModalContext.Provider value={{
            showModal,
            handleBackground,
            checkFields
        }}>
            {
                show && <ModalMensaje modalData={modalData} setShow={setShow} setDisplayBackground={setDisplayBackground} setShowBackground={setShowBackground} />
            }
            {
                showBackground && <ModalBackground displayBackground={displayBackground} show={show} />
            }
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = () => useContext(ModalContext)

export default ModalProvider