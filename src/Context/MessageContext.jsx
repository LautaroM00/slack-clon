import React, { createContext, useContext, useState } from 'react'
import useFetch from '../Hooks/useFetch'

const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const { customFetch } = useFetch()
    const [messages, setMessages] = useState()

    const getMessages = async (amount, channelId) => {
        /*         console.log('fetchMessages') */
        const serverResponse = await customFetch(`/api/message/${amount}/${channelId}`, 'GET')

        return serverResponse.payload.messages
    }

    return (
        <MessageContext.Provider value={{
            messages,
            setMessages,
            getMessages
        }}>
            {children}
        </MessageContext.Provider>
    )
}

export const useMessagesContext = () => useContext(MessageContext)

export default MessageProvider