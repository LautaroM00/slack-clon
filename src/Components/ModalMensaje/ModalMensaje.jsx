import React, { useEffect, useState } from 'react'
import './ModalMensaje.css'

const ModalMensaje = ({ modalData, setShow, displayBackground, setDisplayBackground, setShowBackground }) => {

    const { message, type, execute } = modalData

    const [movement, setMovement] = useState('show')


    const style = {
        'error': { backgroundColor: '#c53e3e' },
        'success': { backgroundColor: 'green' },
        'validation': { backgroundColor: '#c53e3e' }
    }

    useEffect(() => {

        setTimeout(() => {
            setMovement('hide')
        },
            2000
        )

        setTimeout(() => {
            setShowBackground('none')
            setDisplayBackground('none')
            setShow(false)
            execute && execute()
        },
            3000
        )
    },
        []
    )

    return (
        <div className='modalBackground' style={{ display: displayBackground }}>
            <div className={'container ' + movement} style={style[type]}>
                {
                    type === 'success' ? <h2>✅</h2> : <h2>Error: </h2>
                }
                {
                    type === 'validation' ?
                        message.map((errorMessage, index) => {
                            return (
                                message && <p style={{ color: 'white' }} className='message' key={index}>{errorMessage}</p>
                            )
                        }) :
                        <p className='message'>{message}</p>}
            </div>
        </div>
    )
}

export default ModalMensaje