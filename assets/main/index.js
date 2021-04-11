import React from 'react'
import ReactDOM from 'react-dom'
import {ContextProvider} from './context/index'

import Routes from './routes'

ReactDOM.render(
    <ContextProvider>
        <Routes />
    </ContextProvider>,
    document.getElementById('root'),
)
