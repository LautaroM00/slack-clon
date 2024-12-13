import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useCountdown = (time) => {
    const [countdown, setCountdown] = useState(time)
    const [intervalId, setIntervalId] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        setIntervalId(
            setInterval(() => {
                setCountdown((prevCountdown) => {
                    return prevCountdown - 1
                })
            }, 1000))
    }, [])

    setTimeout(() => {
        clearInterval(intervalId)
        navigate('/login')
    }, time * 1000)

    return{
        countdown
    }
}

export default useCountdown