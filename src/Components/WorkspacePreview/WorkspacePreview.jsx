import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import './WorkspacePreview.css'
import useFetch from '../../Hooks/useFetch';
import useForm from '../../Hooks/useForm';
import { useWorkspaceContext } from '../../Context/WorkspaceContext';
import { useModalContext } from '../../Context/ModalContext';

const WorkspacePreview = ({ name, thumbnail }) => {
    const navigate = useNavigate()
    const { showModal } = useModalContext()
    const { workspaces, setWorkspaces, setAdminWorkspaces } = useWorkspaceContext()
    const { type } = useParams()
    const { customFetch } = useFetch()
    const { formState, handleChange } = useForm({
        email: ''
    })

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

    const handleAddMember = async (e) => {
        e.preventDefault()

        const serverResponse = await customFetch(`/api/workspace/member/${name}`, 'POST', formState)

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
        return

    }


    const method = {
        'delete': <button onClick={handleDeleteWorkspace} className={'button'} style={{ backgroundColor: 'red' }}>
            Eliminar
        </button>,
        'addMember':
            <form onSubmit={handleAddMember} className='addMemberForm' >
                <div className='block'>
                    <label htmlFor='email'>
                        Email:
                    </label>
                    <input id='email' name='email' type='email' onChange={handleChange} />
                </div>
                <button className={'button'} style={{ backgroundColor: '#0fca0f', width: '100px' }}>
                    Agregar
                </button>
            </form>
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