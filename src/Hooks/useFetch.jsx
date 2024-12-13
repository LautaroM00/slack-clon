import React from 'react'

const useFetch = () => {

    const fetchFunctions = async (endpoint, method, body) => {

        const authorizationheader = 'Bearer ' + sessionStorage.getItem('accessToken')

        const reqInit = method === 'GET' || method === 'DELETE' ? {
            method: method,
            headers: {
                'Authorization': authorizationheader
            }
        } :
            {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': authorizationheader
                },
                body: JSON.stringify(body)
            }


        return fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, reqInit)

    }

    return {
        fetchFunctions
    }
}

export default useFetch