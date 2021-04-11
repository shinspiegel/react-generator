import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={() => <h1>Page</h1>} path='/' exact />
                <Route component={() => <h1>404</h1>} path='/*' />
            </Switch>
        </BrowserRouter>
    )
}

export default Router
