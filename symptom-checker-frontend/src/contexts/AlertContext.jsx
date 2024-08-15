import PropTypes from 'prop-types'
import { createContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material"
import { CheckOutlined, ErrorOutlineOutlined } from "@mui/icons-material";

/**
 * Context for managing alerts.
 */
export const AlertContext = createContext()

/**
 * AlertProvider component.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered AlertProvider component.
 */
export function AlertProvider({ children }){
    const [alert, setAlert] = useState({ message: '', type: '', open: false })
    // event handlers
    const showAlert = (message, type) => {
        setAlert({ message: message, type: type, open: true })
    }
    const hideAlert = () => {
        setAlert({ ...alert, open: false })
    }
    
    return (
        <AlertContext.Provider value = { showAlert }>
            { children }
            <Snackbar
                open={alert.open}
                autoHideDuration={5000}
                onClose={hideAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={hideAlert}
                    variant="filled"
                    severity={alert.type}
                    icon={alert.type==='success'
                        ?(<CheckOutlined />)
                        :(<ErrorOutlineOutlined />)
                    }
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )
}

AlertProvider.propTypes = {
    children: PropTypes.node.isRequired,
}