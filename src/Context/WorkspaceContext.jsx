import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import ModalMensaje from '../Screens/ModalMensaje/ModalMensaje'

const WorkspaceContext = createContext()

const WorkspaceProvider = ({ children }) => {
    const { customFetch } = useFetch()

    const [modalData, setModalData] = useState()
    const [workspaces, setWorkspaces] = useState()
    const [adminWorkspaces, setAdminWorkspaces] = useState()
    const [channels, setChannels] = useState()
    const [messages, setMessages] = useState()
    const [actualChannel, setActualChannel] = useState([])
    const [show, setShow] = useState(false)


    const getWorkspaces = async (role) => {
        const serverResponse = await customFetch('/api/workspace/' + role, 'GET')

        return serverResponse.payload.workspaces
    }

    const getChannels = async (workspaceName) => {
        const serverResponse = await customFetch('/api/channel/' + workspaceName, 'GET')

        return serverResponse.payload.channels
    }

    const getMessages = async (amount, channelId) => {
        const serverResponse = await customFetch(`/api/message/${amount}/${channelId}`, 'GET')

        return serverResponse.payload.messages
    }

    useEffect(() => {
        !workspaces ? getWorkspaces('member')
            .then((workspaces) => {
                setWorkspaces(workspaces)
                setAdminWorkspaces(workspaces.filter((workspace) => workspace.role === 'admin'))
            }) : ''
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
            setMessages,
            messages,
            adminWorkspaces,
            setAdminWorkspaces,
            setModalData,
            modalData,
            show,
            setShow
        }}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export const useWorkspaceContext = () => useContext(WorkspaceContext)

export default WorkspaceProvider