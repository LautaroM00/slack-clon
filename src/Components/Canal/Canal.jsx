import React from 'react'
import { NavLink } from 'react-router-dom'

const Canal = ({ titulo }) => {
    return (
        <NavLink>
            <li>
                {`#${titulo}`}
            </li>
        </NavLink>
    )
}

export default Canal