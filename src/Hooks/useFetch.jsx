import React from 'react'

const useFetch = () => {

    const customFetch = async (endpoint, method, body) => {

        const authorizationHeader = 'Bearer ' + sessionStorage.getItem('accessToken')

        const reqInit = method === 'GET' || method === 'DELETE' ? {
            method: method,
            headers: {
                'Authorization': authorizationHeader
            }
        } :
            {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': authorizationHeader
                },
                body: JSON.stringify(body)
            }

        const responseHTTP = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, reqInit)

        const responseServer = await responseHTTP.json()
        
        return responseServer
    }

    return  {
        customFetch
    }
}

export default useFetch