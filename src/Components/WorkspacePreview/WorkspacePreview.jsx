import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxEnter } from "react-icons/rx";

import { cortarPalabra } from '../../Screens/CrearWorkSpace';

import './WorkspacePreview.css'

const WorkspacePreview = ({ titulo, thumbnail, id }) => {
    return (
        <>
            <div className='WorkspacePreview'>
                <div className='izquierda'>
                    <img src={thumbnail} style={{ width: '60px', borderRadius: '50%' }} />
                    <h2>{titulo}</h2>
                </div>
                <NavLink to={`/workspace/${id}/1`} className={'navLink'}>
                    <RxEnter style={{ width: '30px', height: '30px' }} />
                </NavLink>
            </div>
        </>
    )
}

export default WorkspacePreview