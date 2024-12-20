import React from 'react'
import useForm from '../../Hooks/useForm'
import './Form.css'

export const Form = ({ formData, initialFormState, action, children }) => {

    const handleSubmit = (e) => {
        e.preventDefault()

        action(formState)

    }

    const { formState, handleChange } = useForm(initialFormState)

    const { title, divs, formClass, containerClass } = formData
    return (
        <div className={containerClass ? containerClass : 'formContainer'}>
            <form onSubmit={handleSubmit} className={formClass && formClass}>
                <h1>{title}</h1>
                {
                    divs.map((div, index) => {

                        const { labelProps, inputProps, labelText, divClass } = div

                        return (
                            <div key={index} className={divClass ? divClass : 'block'}>
                                <label {...labelProps}>{labelText}</label>
                                <input onChange={handleChange} {...inputProps} autoComplete='off' />
                            </div>
                        )
                    })
                }
                {children}
            </form>
        </div>
    )
}
