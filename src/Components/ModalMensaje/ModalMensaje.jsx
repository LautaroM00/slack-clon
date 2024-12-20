import React, { useEffect, useState } from 'react'
import './ModalMensaje.css'

const ModalMensaje = ({ modalData, setShow }) => {

    const {message, type, execute} = modalData

    const [movement, setMovement] = useState('show')
    const [display, setDisplay] = useState('none')
    const style = {
        'error': {backgroundColor: '#c53e3e'},
        'success': {backgroundColor: 'green'}
    }

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
            execute && execute()
        },
            3000
        )
    },
        []
    )

    return (
        <div className='modal' style={{ display: display }}>
            <div className={'container ' + movement} style={style[type]}>
                {
                    type === 'error' && <h2>Error: </h2>
                }
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ModalMensaje