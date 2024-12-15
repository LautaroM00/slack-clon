import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'

const WorkspaceContext = createContext()

const WorkspaceProvider = ({children}) => {

    const [workspaces, setWorkspaces] = useState([])

    const {customFetch} = useFetch()

    const getWorkspaces = async () => {
        const serverResponse = await customFetch('/api/workspace/', 'GET')

        return serverResponse.payload.workspaces
    }

    useEffect(() => {
        getWorkspaces()
        .then((workspaces) => setWorkspaces(workspaces))
    },
    []
)

console.log(workspaces)

    return (
        <WorkspaceContext.Provider value={{
            workspaces: workspaces
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext)

export default WorkspaceProvider