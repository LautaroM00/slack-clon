import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'

const WorkspaceContext = createContext()

const WorkspaceProvider = ({ children }) => {
    const { customFetch } = useFetch()
    const [workspaces, setWorkspaces] = useState()
    const [adminWorkspaces, setAdminWorkspaces] = useState()
    const [channels, setChannels] = useState([])
    const [messages, setMessages] = useState()


    const getWorkspaces = async (role) => {
        console.log('fetchWorkspace')
        const serverResponse = await customFetch('/api/workspace/' + role, 'GET')
        return serverResponse.payload.workspaces
    }

    const getChannels = async (workspaceName, amount) => {
/*         console.log('fetchChannels') */
        const serverResponse = await customFetch(`/api/channel/${amount}/${workspaceName}`, 'GET')

        return serverResponse.payload.channels
    }

    const getMessages = async (amount, channelId) => {
/*         console.log('fetchMessages') */
        const serverResponse = await customFetch(`/api/message/${amount}/${channelId}`, 'GET')

        return serverResponse.payload.messages
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
            getChannels,
            channels,
            setChannels,
            getMessages,
            setMessages,
            messages,
            adminWorkspaces,
            setAdminWorkspaces,
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext)

export default WorkspaceProvider