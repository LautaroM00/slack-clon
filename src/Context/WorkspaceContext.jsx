import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'

const WorkspaceContext = createContext()

const WorkspaceProvider = ({ children }) => {
    const { customFetch } = useFetch()

    const [workspaces, setWorkspaces] = useState()
    const [adminWorkspaces, setAdminWorkspaces] = useState()
    const [channels, setChannels] = useState()
    const [messages, setMessages] = useState()
    const [actualChannel, setActualChannel] = useState([])


    const getWorkspaces = async (role) => {
        const serverResponse = await customFetch('/api/workspace/' + role, 'GET')

        return serverResponse.payload.workspaces
    }

    const getChannels = async (workspaceName) => {
        const serverResponse = await customFetch('/api/channel/' + workspaceName, 'GET')

        return serverResponse.payload.channels
    }
    
    const getMessages = async (channelId) => {
        const serverResponse = await customFetch('/api/message/' + channelId, 'GET')

        return serverResponse.payload.messages
    }

    useEffect(() => {
        !workspaces ? getWorkspaces('member')
        .then((workspaces) => setWorkspaces(workspaces)) : ''
        
        !adminWorkspaces ? getWorkspaces('admin')
        .then((workspaces) => setAdminWorkspaces(workspaces)) : ''

    }, 
        [workspaces]
    )
    return (
        <WorkspaceContext.Provider value={{
            workspaces,
            setWorkspaces,
            getChannels,
            channels,
            setChannels,
            actualChannel,
            setActualChannel,
            getMessages,
            adminWorkspaces
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext)

export default WorkspaceProvider