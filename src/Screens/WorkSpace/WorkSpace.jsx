import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { TfiViewListAlt } from "react-icons/tfi";

import { Canal } from '../index.js'

import './WorkSpace.css'
import ChannelProvider from '../../Context/ChannelContext.jsx';

const WorkSpace = () => {
    return (
        <div className='workspace'>
            <div className='workspace-arriba'>
                <NavLink to={'/'} className='navLink'>
                    <MdOutlineKeyboardBackspace className='workspaceImg' />
                    <TfiViewListAlt className='workspaceImg' />
                </NavLink>
            </div>
            <ChannelProvider>
                <Canal />
            </ChannelProvider>
        </div>
    )
}

export default WorkSpace