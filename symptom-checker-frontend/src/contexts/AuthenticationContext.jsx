// react
import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'
// services
import authServices from "../services/auth";
// context
import { UserContext } from "./UserContext";
import { useAlert } from "./useAlert";


/**
 * @typedef {Object} AuthenticationContext
 * @property {Function} Provider - The provider component for the authentication context.
 * @property {Object} value - The value object containing the authentication state and methods.
 */
export const AuthenticationContext = createContext()

/**
 * AuthenticationProvider component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { setUser } = useContext(UserContext)
    const showAlert = useAlert()

    // register and authenticate guest user
    const authenticateGuestUser = async () => {
        try {
            const guestUser = await authServices.createGuestUser()
            setUser(guestUser.username)
            setIsAuthenticated(true)
            showAlert('Guest user access authorized.', 'success')
        } catch (error) {
            console.error('Error during Guest user authentication : ', error)
            showAlert('Guest user access creation failed!', 'error')
        }
    }

    // user registration (signup)
    const registerUser = async (credentials) => {
        try {
            const registeredUser = await authServices.registerUser(credentials)
            setUser(registeredUser)
            //loginRedirect() // after successful registration
            showAlert('Signed up successfully!', 'success') // success alert
        } catch (error) {
            console.error('Error during Registration : ', error);
            showAlert(`Error during Registration : ${error.response.data.error}`, 'error')// error alert
        }
    }


    // user authentication (login)
    const authenticateUser = async(credentials) => {
        try {
            const authorizedUser = await authServices.authenticateUser(credentials)
            // store username in sessionStorage for global access 
            window.sessionStorage.setItem('authenticatedUser', authorizedUser.username)
            setUser(authorizedUser.username)
            setIsAuthenticated(true)
            showAlert('Logged in successfully!', 'success') // success alert
        } catch (error) {
            console.error('Error during Login : ', error);
            showAlert(`Error during Login : ${error.response.data.error}`, 'error') // error alert
        }
    } 

    // clear user session (logout)
    const clearUserSession = async() => {
        try {
            window.sessionStorage.removeItem('authenticatedUser')
            await authServices.invalidateUserSession()
            setUser(null)
            setIsAuthenticated(false)
            showAlert('Logged out successfully.', 'success')
        } catch (error) {
            console.error('Error during Logout : ', error)
            showAlert(`Error during Logout : ${error.response.data.error}`, 'error')        
        }
    }

    return (
        <AuthenticationContext.Provider value={{ 
            isAuthenticated, 
            authenticateGuestUser,
            registerUser,
            authenticateUser,
            clearUserSession,
         }}
        >
            { children }
        </AuthenticationContext.Provider>
    )
}

AuthenticationProvider.propTypes = {
    children: PropTypes.node.isRequired,
}