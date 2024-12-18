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
import validateInputsCreateWorkspace from '../../Utils/validations'

const ModalWorkSpace = () => {
    const [displayCondiciones, setDisplayCondiciones] = useState('none')
    const [inputInvalido, setInputInvalido] = useState('')
    const [conditions, setConditions] = useState([])

    const navigate = useNavigate()

    const initialFormState = {
        workspaceName: '',
        channelName: ''
    }

    const { workspaces, setWorkspaces, adminWorkspaces, setAdminWorkspaces, setShow, setModalData } = useWorkspaceContext()
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
        const errors = validateInputsCreateWorkspace(workspaceName, channelName, workspaces)
        if (errors.length === 0) {

            setInputInvalido('')
            setDisplayCondiciones('none')


            const serverResponse = await customFetch('/api/workspace/', 'POST', { formState })

            if (serverResponse.ok) {
                setWorkspaces([...workspaces, { name: workspaceName, role: 'admin' }])
                setAdminWorkspaces([...adminWorkspaces, { name: workspaceName, role: 'admin' }])
                setShow(true)
                setModalData({
                    message: serverResponse.message,
                    type: 'success',
                    navigate: navigate('/')
                })
                return
            } else {
                setShow(true)
                setModalData({
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