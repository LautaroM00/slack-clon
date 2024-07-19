import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { WorkSpace } from './index.js'
import { SelectorWorkspace } from './index.js'
import { CrearWorkSpace } from './index.js'

function App() {


    return (
        <Routes>
            <Route path='/' element={<SelectorWorkspace />} />
            <Route path='/workspace/:id' element={<WorkSpace />} />
        </Routes>
    )
}

export default App
