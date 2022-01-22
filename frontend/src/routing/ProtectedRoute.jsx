import React, { useContext } from 'react'
import { Route, Redirect} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export const ProtectedRoute = ({ children, rest }) => {
    const {isAuthenticated} = useContext(CurrentUserContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
