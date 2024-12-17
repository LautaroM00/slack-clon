import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import './WorkspacePreview.css'
import useFetch from '../../Hooks/useFetch';
import { Form } from '../Form/Form';
import useForm from '../../Hooks/useForm';

const WorkspacePreview = ({ name, thumbnail }) => {

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
                return alert('Workspace eliminado con éxito.')
            }
        }
        return
    }

    const handleAddMember = async (e) => {
        e.preventDefault()

        const serverResponse = await customFetch(`/api/workspace/member/${name}`, 'POST', formState)

        if (serverResponse.ok) {
            e.target[0].value = ''
            return alert(serverResponse.message)
        } else {
            return alert(serverResponse.message)
        }
    }


    const method = {
        'delete': <button onClick={handleDeleteWorkspace} className={'button'} style={{ backgroundColor: 'red' }}>
            Eliminar
        </button>,
        'addMember':
            <>
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
            </>
    }




    /*     const handleAddMemberWorkspace = async () => {
            e.preventDefault()
    
            const serverResponse = await customFetch('/api/workspace/delete/') 
    
            if(serverResponse.ok){
                return alert('Miembro agregado con éxito')
            }
        } */

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