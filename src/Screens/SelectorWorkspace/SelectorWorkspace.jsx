import React from 'react'

import { setLS, traerLS, actualizarLS } from '../../FUNCIONES_LOCAL_STORAGE'
import { WorkspacePreview } from '../index'

import './SelectorWorkspace.css'

const SelectorWorkspace = () => {

    setLS()

    const WORKSPACES = traerLS()

    return (
        <>
            <header>
                Bienvenido!
            </header>
            <main>
                Seleccionar
                <nav className='SW_nav'>
                    {
                        WORKSPACES.map((workspace, index) => {
                            const { titulo, thumbnail, id } = workspace
                            return(
                                <WorkspacePreview titulo={titulo} thumbnail={thumbnail} id={id} key={index}/>
                            )
                        })
                    }
                </nav>
            </main>
            <footer>
                <button onClick={actualizarLS}>REINICIAR</button>
            </footer>
        </>
    )
}

export default SelectorWorkspace