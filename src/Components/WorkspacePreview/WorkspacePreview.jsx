import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import './WorkspacePreview.css'
import useFetch from '../../Hooks/useFetch';
import { useWorkspaceContext } from '../../Context/WorkspaceContext';
import { useModalContext } from '../../Context/ModalContext';
import useForm from '../../Hooks/useForm';

const WorkspacePreview = ({ name, thumbnail }) => {
    const navigate = useNavigate()
    const { showModal } = useModalContext()
    const { workspaces, setWorkspaces, setAdminWorkspaces } = useWorkspaceContext()
    const { type } = useParams()
    const { customFetch } = useFetch()

    const handleDeleteWorkspace = async (e) => {
        if (confirm(`¿Realmente desea eliminar el workspace '${name.toUpperCase()}'?`)) {
            e.preventDefault()

            const serverResponse = await customFetch(`/api/workspace/delete/${name}`, 'PUT')

            if (serverResponse.ok) {
                const newWorkspaces = workspaces.filter((workspace) => workspace.name !== name)
                setWorkspaces(newWorkspaces)
                setAdminWorkspaces(newWorkspaces)
                newWorkspaces.length === 0 ?
                    showModal({
                        message: serverResponse.message,
                        type: 'success',
                        execute: navigate('/')
                    }) :
                    showModal({
                        message: serverResponse.message,
                        type: 'success'
                    })
                return
            } else {
                return showModal({
                    message: serverResponse.message,
                    type: 'error'
                })
            }
        }
        return
    }

    const actionAddMember = async (formState) => {

        const serverResponse = await customFetch(`/api/workspace/member/${name}`, 'POST', formState)

        return serverResponse
    }

    const actionDeleteMember = async (formState) => {

        const serverResponse = await customFetch(`/api/workspace/member/${name}/${formState.email}`, 'DELETE' )
        
        return serverResponse
    }


    const method = {
        'delete': <button onClick={handleDeleteWorkspace} className={'button'} style={{ backgroundColor: 'red' }}>
            Eliminar
        </button>,
        'addMember':
            <WorkspacePreviewForm action={actionAddMember} buttonText={'Agregar'} backgroundColor={'green'} />,
        'deleteMember':
            <WorkspacePreviewForm action={actionDeleteMember} backgroundColor={'red'} buttonText={'Eliminar'} />
    }

    return (
        <>
            <div className='WorkspacePreview'>
                <div className='izquierda'>
                    <img src={thumbnail} />
                    <h2>{name}</h2>
                </div>
                {
                    method[type] ?
                        method[type] :
                        <NavLink to={`/workspace/${name}/0`} className={'button'} style={{ backgroundColor: '#cb33df' }}>
                            Entrar
                        </NavLink>
                }
            </div>
        </>
    )
}

export default WorkspacePreview


const WorkspacePreviewForm = ({ action, backgroundColor, buttonText}) => {
    const {formState, handleChange} = useForm({
        email: ''
    })
    const { showModal } = useModalContext()


    const handle = async (e) => {
        e.preventDefault()

        const serverResponse = await action(formState)

        serverResponse.ok ?
        showModal({
            message: serverResponse.message,
            type: 'success'
        }) :
        showModal({
            message: serverResponse.message,
            type: 'error'
        })

    e.target.value = ''

    }

    return (
        <form onSubmit={handle} className='memberForm' >
            <div className='block'>
                <label htmlFor='email'>
                    Email:
                </label>
                <input id='email' name='email' type='email' onChange={handleChange} />
            </div>
            <button className={'button'} style={{ backgroundColor: backgroundColor, width: '100px' }}>
                {buttonText}
            </button>
        </form>
    )
}