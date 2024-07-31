import React, { useState } from 'react'

import './CrearWorkSpace.css'
import { actualizarLS, traerLS } from '../../FUNCIONES_LOCAL_STORAGE'
import SelectorWorkspace from '../SelectorWorkspace/SelectorWorkspace'
import { NavLink } from 'react-router-dom'
import InformacionInput from '../../Components/InformacionInput/InformacionInput'
import ListaCondiciones from '../../Components/ListaCondiciones/ListaCondiciones'

const CrearWorkSpace = () => {
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [inputInvalido, setInputInvalido] = useState('')
    const [errorNombreRepetido, setErrorNombreRepetido] = useState('')
    const [errorLongitudNombreWorkspace, setErrorLongitudNombreWorkspace] = useState('')
    const [errorLongitudNombreCanal, setErrorLongitudNombreCanal] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const WORKSPACES = traerLS()

        let nombreWorkspace = e.target['nombreWorkspace'].value
        let nombreCanal = e.target['nombreCanal'].value

        let estaRepetido = WORKSPACES.find((workspace) => {
            return (workspace.titulo === nombreWorkspace)
        })

        if (nombreWorkspace !== '' &&
            nombreCanal !== '' &&
            nombreWorkspace.length <= 20 &&
            nombreWorkspace.length >= 5 &&
            nombreCanal.length <= 23 &&
            nombreCanal.length >= 3 &&
            !estaRepetido) {

            setInputInvalido('')
            setDisplayCondiciones('none')

            WORKSPACES.push({
                titulo: nombreWorkspace,
                thumbnail: '/iconos/workspacePredeterminado.png',
                canales: [
                    {
                        titulo: nombreCanal,
                        miembros: [
                            {
                                nombre: 'Tú',
                                thumbnail: '/thumbnails/chad.png',
                                mensajesCanal: '.',
                                id: 1
                            }],
                        mensajes: [{
                            autor: 'Tú',
                            texto: 'holaa',
                            hora: '19:57',
                            id: 1
                        }],
                        id_canal: 1
                    },
                ],
                contactos: [],
                id: WORKSPACES.length + 1
            })
            e.target['nombreWorkspace'].value = ''
            e.target['nombreCanal'].value = ''
            actualizarLS(WORKSPACES)
            setErrorNombreRepetido('')
            setErrorLongitudNombreCanal('')
            setErrorLongitudNombreWorkspace('')
            setDisplayCondiciones('none')

        } else {
            setInputInvalido('4px solid red')
            setDisplayCondiciones('')
            if (nombreWorkspace.length > 20 ||
                nombreWorkspace.length < 5) {
                setErrorLongitudNombreWorkspace('El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.')
            } else {
                setErrorLongitudNombreWorkspace('')
            }

            if (nombreCanal.length > 23 ||
                nombreCanal.length < 3) {
                setErrorLongitudNombreCanal('El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.')
            } else {
                setErrorLongitudNombreCanal('')
            }

            if (estaRepetido) {
                setErrorNombreRepetido('Ya existe un workspace con el nombre que intenta ingresar.')
            } else {
                setErrorNombreRepetido('')
            }
        }
    }

    return (
        <>
            <div className='contenedorCW'>
                <form onSubmit={handleSubmit} className='crearWorkspace'>
                    <div className='label-input'>
                        <label htmlFor='nombreWorkspace'>Nombre Workspace:</label>
                        <input type='text' id='nombreWorkspace' name='nombreWorkspace' style={{ border: inputInvalido }} />
                    </div>
                    <div className='label-input'>
                        <label htmlFor='nombreCanal'>Nombre Canal:</label>
                        <input type='text' id='nombreCanal' name='nombreCanal' style={{ border: inputInvalido }} />
                    </div>
                    <div className='botones'>
                        <button type='submit'>Crear</button>
                        <NavLink to={'/'} className='salir'>
                            Salir
                        </NavLink>
                        <InformacionInput setCondiciones={setDisplayCondiciones} displayCondiciones={displayCondiciones} />
                    </div>
                    <ListaCondiciones displayCondiciones={displayCondiciones}
                    condiciones={(errorLongitudNombreCanal || errorLongitudNombreWorkspace || errorNombreRepetido) ?
                        [
                            errorNombreRepetido,
                            errorLongitudNombreWorkspace,
                            errorLongitudNombreCanal
                        ] :
                        ['El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.',
                            'El nombre del CANAL debe tener entre 3 y 23 caracteres inclusive.'
                        ]
                    } />
                </form>
            </div>
            <div className='sombra'>
            </div>
            <SelectorWorkspace />
        </>
    )
}

export default CrearWorkSpace