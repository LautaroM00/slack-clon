import React from 'react'

import './ListaCondiciones.css'

const ListaCondiciones = ({ displayCondiciones, condiciones }) => {

    const workspaceConditions = [
        'El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.',
        'El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.'
    ]



    return (
        <div className='listaCondiciones' style={{ display: displayCondiciones }}>
            <h3>Debe tener la/s siguientes condiciones:</h3>
            {
                condiciones.length > 0 ?
                    condiciones.map((condicion, index) => {
                        return (<p key={index}>{condicion}</p>)
                    }) :
                    workspaceConditions.map((condicion, index) => {
                        return (<p key={index}>{condicion}</p>)
                    })
            }
        </div>
    )
}

export default ListaCondiciones