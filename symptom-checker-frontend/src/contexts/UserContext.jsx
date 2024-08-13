import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'

// Context component for App component
export const UserContext = createContext();

export function UserProvider({ children }){
    const [user, setUser] = useState(null)
    // get and store user information
    useEffect(() => {
        const authorizedUser = window.sessionStorage.getItem('authenticatedUser')
        setUser(authorizedUser)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}