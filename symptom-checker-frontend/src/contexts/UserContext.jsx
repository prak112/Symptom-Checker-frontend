import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types'

/**
 * UserContext
 * @type {React.Context}
 * @desc A context object for managing user data.
 */
export const UserContext = createContext();

/**
 * UserProvider component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered UserProvider component.
 */
export function UserProvider({ children }){
    const [user, setUser] = useState({username: '', registrationTime: ''})
    // get and store user information
    useEffect(() => {
        const authorizedUser = window.sessionStorage.getItem('authenticatedUser')
        if(authorizedUser) {
            setUser(authorizedUser)
        }
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