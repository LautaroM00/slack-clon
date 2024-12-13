import React from 'react'
import useForm from '../../Hooks/useForm'
import './Form.css'

export const Form = ({ formData, initialFormState, action, children }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        action(formState)

    }

    const { formState, handleChange } = useForm(initialFormState)

    const { title, divs } = formData
    return (
        <div className='formContainer'>
            <form onSubmit={handleSubmit}>
                <h1>{title}</h1>
                {
                    divs.map((div, index) => {

                        const { labelProps, inputProps, labelText } = div

                        return (
                            <div key={index} className='block'>
                                <label {...labelProps}>{labelText}</label>
                                <input onChange={handleChange} {...inputProps} autoComplete='off'/>
                            </div>
                        )
                    })
                }
                <div className='childrenDiv'>
                    {children}
                </div>
            </form>
        </div>
    )
}
