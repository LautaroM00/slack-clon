import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';

const ModalBackground = ({displayBackground, show}) => {
    return (
        <div className='shadow' style={{display: displayBackground}}>
            {
                !show && <ProgressSpinner  style={{width: '200px', height: '200px'}} strokeWidth="5" />
            }
        </div>
    )
}

export default ModalBackground