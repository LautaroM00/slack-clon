import React from 'react'

import './ListaCondiciones.css'

const ListaCondiciones = ({ displayCondiciones, condiciones }) => {

    return (
        <div className='listaCondiciones' style={{ display: displayCondiciones }}>
            <h3>Debe tener la/s siguientes condiciones:</h3>
            {
                condiciones.map((condicion, index) => {
                    return(<p key={index}>{condicion}</p>)
                })
            }
        </div>
    )
}

export default ListaCondiciones