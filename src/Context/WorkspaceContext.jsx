import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'

const WorkspaceContext = createContext()

const WorkspaceProvider = ({ children }) => {
    const { customFetch } = useFetch()
    const [workspaces, setWorkspaces] = useState()
    const [adminWorkspaces, setAdminWorkspaces] = useState()

    const getWorkspaces = async (role) => {
        const serverResponse = await customFetch('/api/workspace/' + role, 'GET')
        return serverResponse.payload.workspaces
    }

    useEffect(() => {
        getWorkspaces('member')
            .then((workspaces) => {
                setWorkspaces(workspaces)
                setAdminWorkspaces(workspaces.filter((workspace) => workspace.role === 'admin'))
            })
    },
        []
    )

    return (
        <WorkspaceContext.Provider value={{
            workspaces,
            setWorkspaces,
            adminWorkspaces,
            setAdminWorkspaces,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext)

export default WorkspaceProvider