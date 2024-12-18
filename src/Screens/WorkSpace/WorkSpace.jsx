import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";

import { Canal } from '../index.js'

import './WorkSpace.css'
import { useWorkspaceContext } from '../../Context/WorkspaceContext.jsx';
import ModalMensaje from '../ModalMensaje/ModalMensaje.jsx';

const WorkSpace = () => {

    const { show, setShow, modalData } = useWorkspaceContext()

    return (
        <div className='workspace'>
            {
                show ? <ModalMensaje modalData={modalData} setShow={setShow} /> : ''
            }
            <div className='workspace-arriba'>
                <NavLink to={'/'} className='navLink'>
                    <MdOutlineKeyboardBackspace className='workspaceImg' />
                    <TfiViewListAlt className='workspaceImg' />
                </NavLink>
            </div>
            <Canal />
        </div>
    )
}

export default WorkSpace