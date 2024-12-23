import React, { useEffect, useState } from 'react'

const useMovement = () => {

    const [movement, setMovement] = useState(' closed')
    const [displayButton, setDisplayButton] = useState('')

    const handleMovement = () => {
        
        movement === ' closed' && setMovement(' entrar')

        if(movement != ' closed'){
            movement === ' salir' ? setMovement(' entrar') : setMovement(' salir')
        }

    }

    return {
        handleMovement,
        movement,
        displayButton
    }
}

export default useMovement