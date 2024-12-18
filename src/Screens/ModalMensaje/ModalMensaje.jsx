import React, { useEffect, useState } from 'react'
import './ModalMensaje.css'

const ModalMensaje = ({ modalData, setShow }) => {

    const {message, type} = modalData

    const [movement, setMovement] = useState('show')
    const [display, setDisplay] = useState('none')

    useEffect(() => {

        setDisplay('')

        setTimeout(() => {
            setMovement('hide')
        },
            2000
        )

        setTimeout(() => {
            setDisplay('none')
            setShow(false)
        },
            3000
        )
    },
        []
    )

    return (
        <div className='modal' style={{ display: display }}>
            <div className={'container ' + movement} style={{backgroundColor: type === 'error' ? '#c53e3e' : 'green'}}>
                {
                    type === 'error' ?
                    <h2>Error: </h2> :
                    ''
                }
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ModalMensaje