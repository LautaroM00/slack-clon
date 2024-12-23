import React, { useEffect, useState } from 'react'
import './ModalMensaje.css'

const ModalMensaje = ({ modalData, setShow, displayBackground, setDisplayBackground, setShowBackground }) => {

    const {message, type, execute} = modalData

    const [movement, setMovement] = useState('show')


    const style = {
        'error': {backgroundColor: '#c53e3e'},
        'success': {backgroundColor: 'green'}
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
        <div className='modalBackground' style={{display: displayBackground}}>
            <div className={'container ' + movement} style={style[type]}>
                {
                    type === 'error' ? <h2>Error: </h2> : <h2>✅</h2>
                }
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ModalMensaje