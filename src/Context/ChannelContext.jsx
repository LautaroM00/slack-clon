import React, { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../Hooks/useFetch'
import { useParams } from 'react-router-dom'

const ChannelContext = createContext()

const ChannelProvider = ({ children }) => {
    const { customFetch } = useFetch()
    const [channels, setChannels] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [channelName, setChannelName] = useState('')
    const { workspaceName } = useParams()



    const getChannels = async (workspaceName, amount) => {
        const serverResponse = await customFetch(`/api/channel/${amount}/${workspaceName}`, 'GET')

        return serverResponse.payload
    }
    useEffect(() => {
        getChannels(workspaceName, 'all').then((payload) => {
            setIsAdmin(payload.isAdmin)
            setChannels(payload.channels)
        });
    },
        []
    )

    return (
        <ChannelContext.Provider value={{
            setChannels,
            getChannels,
            channels,
            isAdmin,
            channelName,
            setChannelName
        }}>
            {children}
        </ChannelContext.Provider>
    )
}

export const useChannelContext = () => useContext(ChannelContext)

export default ChannelProvider