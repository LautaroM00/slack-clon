import React from 'react'

import './ListaCondiciones.css'

const ListaCondiciones = ({ displayCondiciones }) => {
    return (
        <div className='listaCondiciones' style={{ display: displayCondiciones }}>
            <h3>Debe tener las siguientes condiciones:</h3>
            <span>
                Workspace: mas de 5 caracteres y menos de 20
            </span>
            <span>
                Canal: mas de 2 caracteres y menos de 15
            </span>
        </div>
    )
}

export default ListaCondiciones