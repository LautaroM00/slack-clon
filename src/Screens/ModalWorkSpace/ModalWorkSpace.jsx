import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

import SelectorWorkspace from '../SelectorWorkspace/SelectorWorkspace'
import InformacionInput from '../../Components/InformacionInput/InformacionInput'
import ListaCondiciones from '../../Components/ListaCondiciones/ListaCondiciones'
import ListaWorkspacesPreview from '../../Components/ListaWorkspacesPreview/ListaWorkspacesPreview'

import useFetch from '../../Hooks/useFetch'
import { Form } from '../../Components/Form/Form'
import { useModalContext } from '../../Context/ModalContext'
import { useWorkspaceContext } from '../../Context/WorkspaceContext'
import validateInputsCreateWorkspace from '../../Utils/validations'
import './ModalWorkSpace.css'


const ModalWorkSpace = () => {
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [inputInvalido, setInputInvalido] = useState('')
    const [conditions, setConditions] = useState([])
    const {showModal} = useModalContext()
    const { workspaces, setWorkspaces, adminWorkspaces, setAdminWorkspaces } = useWorkspaceContext()
    const { customFetch } = useFetch()
    const { type } = useParams()

    const navigate = useNavigate()

    const initialFormState = {
        workspaceName: '',
        channelName: ''
    }



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
        const errors = validateInputsCreateWorkspace(workspaceName, channelName, workspaces)
        if (errors.length === 0) {

            setInputInvalido('')
            setDisplayCondiciones('none')


            const serverResponse = await customFetch('/api/workspace/', 'POST', { formState })
            
            if (serverResponse.ok) {
                setWorkspaces([...workspaces, serverResponse.payload.workspace])
                setAdminWorkspaces([...adminWorkspaces, serverResponse.payload.workspace])
                showModal({
                    message: serverResponse.message,
                    type: 'success',
                    execute: () => navigate('/')
                })
                return
            } else {
                showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
                return
            }

        } else {
            setInputInvalido('4px solid red')
            setDisplayCondiciones('')

            setConditions(errors)
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
                            <ListaCondiciones
                                displayCondiciones={displayCondiciones}
                                condiciones={conditions} 
                                type={'workspace'}
                                />
                        </Form> :
                        <>
                            <ListaWorkspacesPreview workspaces={adminWorkspaces} />
                            <button className='return' onClick={() => navigate('/')} >Volver</button>
                        </>
                }
            </div>
            <SelectorWorkspace />
        </>
    )
}

export default ModalWorkSpace