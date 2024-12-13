import React, { useState } from 'react'

const useForm = (initialFormState) => {

    const [formState, setFormState] = useState(initialFormState)

    const handleChange = (e) => {

        const field_name = e.target.name
        const field_value = e.target.value

        setFormState((prevFormState) => {
            return ({ ...prevFormState, [field_name]: field_value })
        })
    }


    return {
        formState,
        handleChange
    }
}

export default useForm