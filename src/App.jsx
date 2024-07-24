import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Workspace, SelectorWorkspace, CrearWorkSpace, Canal  } from './index.js'

function App() {
    return (
        <Routes>
            <Route path='/' element={<SelectorWorkspace />} />
            <Route path='/workspace/:id' element={<Workspace />} />
            <Route path='/workspace/:id/:idCanalParams' element={<Workspace />}/>
            <Route path='/workspace/new' element={<CrearWorkSpace />} />
        </Routes>
    )
}

export default App
