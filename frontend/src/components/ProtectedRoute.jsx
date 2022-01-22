import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ children, rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem('jwt') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    )
}
