import React from 'react'
import Main from '../components/Main'
import Login from '../components/Login'
import Signup from '../components/Signup'
import { ProtectedRoute } from './ProtectedRoute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <ProtectedRoute exact path="/">
                <Main />
            </ProtectedRoute>
            <Route exact path="/signin">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
        </Switch>
    </BrowserRouter>
)

export default AppRouter
