import React, { useState } from 'react'

import './ModalWorkSpace.css'
import SelectorWorkspace from '../SelectorWorkspace/SelectorWorkspace'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import InformacionInput from '../../Components/InformacionInput/InformacionInput'
import ListaCondiciones from '../../Components/ListaCondiciones/ListaCondiciones'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'
import useFetch from '../../Hooks/useFetch'
import { Form } from '../../Components/Form/Form'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'

const ModalWorkSpace = () => {
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [inputInvalido, setInputInvalido] = useState('')
    const [errorNombreRepetido, setErrorNombreRepetido] = useState('')
    const [errorLongitudNombreWorkspace, setErrorLongitudNombreWorkspace] = useState('')
    const [errorLongitudNombreCanal, setErrorLongitudNombreCanal] = useState('')

    const navigate = useNavigate()

    const initialFormState = {
        workspaceName: '',
        channelName: ''
    }

    const { workspaces, setWorkspaces, adminWorkspaces } = useWorkspaceContext()
    const { customFetch } = useFetch()

    const { type } = useParams()

    const formData = {
        title: '',
        divClass: 'label-input',
        formClass: 'crearWorkspace',
        containerClass: 'contenedorCW',
        divs: [
            {
                divClass: 'label-input',
                labelProps: {
                    htmlFor: 'workspaceName'
                },
                labelText: 'Nombre Workspace:',
                inputProps: {
                    id: 'workspaceName',
                    name: 'workspaceName',
                    style: { border: inputInvalido }
                }
            },
            {
                divClass: 'label-input',
                labelProps: {
                    htmlFor: 'channelName'
                },
                labelText: 'Nombre Canal:',
                inputProps: {
                    id: 'channelName',
                    name: 'channelName',
                    style: { border: inputInvalido }
                }
            }
        ]
    }

    const handleSubmit = async (formState) => {

        const { workspaceName, channelName } = formState

        console.log(formState)
        let estaRepetido = workspaces.find((workspace) => {
            return (workspace.name === workspaceName)
        })

        if (workspaceName !== '' &&
            channelName !== '' &&
            workspaceName.length <= 20 &&
            workspaceName.length >= 5 &&
            channelName.length <= 23 &&
            channelName.length >= 3 &&
            !estaRepetido) {

            setInputInvalido('')
            setDisplayCondiciones('none')


            const serverResponse = await customFetch('/api/workspace/', 'POST', { formState })

            console.log(serverResponse)

            if (serverResponse.ok) {
                setWorkspaces(undefined)
                return navigate('/')
            }

        } else {
            setInputInvalido('4px solid red')
            setDisplayCondiciones('')
            if (workspaceName.length > 20 ||
                workspaceName.length < 5) {
                setErrorLongitudNombreWorkspace('El nombre del WORKSPACE debe tener entre 5 y 20 caracteres inclusive.')
            } else {
                setErrorLongitudNombreWorkspace('')
            }

            if (channelName.length > 23 ||
                channelName.length < 3) {
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
                {
                    type === 'new' ?
                        <Form action={handleSubmit} formData={formData} initialFormState={initialFormState}>
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
                        </Form> :
                        <>
                            <ListaWorkspacesPreview workspaces={adminWorkspaces}/>
                            <button className='return' onClick={() => navigate('/')} >Volver</button>
                        </>
                }
            </div>
            <SelectorWorkspace />
        </>
    )
}

export default ModalWorkSpace