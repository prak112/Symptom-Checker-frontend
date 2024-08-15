// materialUI
import { Box, Button, Modal, Typography, Divider } from '@mui/material'
import { TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import { LoginOutlined } from '@mui/icons-material'
import EnhancedEncryptionOutlined from '@mui/icons-material/EnhancedEncryptionOutlined';
// react
import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// resources
import Copyright from '../Copyright';
import authServices from '../../services/auth'
import Logo from '../../assets/logo.svg'
// context
import { UserContext } from '../../contexts/UserContext'
import { useAlert } from '../../contexts/useAlert';

// styles
const boxStyle = {
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '75vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const formStyle = {
    display: 'grid',
    gap: '1rem'
}

const centeredDivStyle = {
    width: "50%",
    paddingTop: "20px",
    margin: "0 auto"
}

const modalStyle = {
    background: 'linear-gradient(to top, #FFC107 10%, #FFEB3B 90%)', // matt-yellow
    // background: 'linear-gradient(to bottom, #A3D1CC, #536B68)' // matt-green
}

/**
 * LoginModal component.
 * 
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Flag indicating if the modal is open.
 * @param {Function} props.handleClose - Function to handle modal close event.
 * @returns {JSX.Element|null} The LoginModal component.
 */
export default function LoginModal({ open, handleClose }){
    // setup states
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()
    // setup context
    const { setUser } = useContext(UserContext)
    const showAlert = useAlert()

    // Auth service handler
    const authenticateUser = async (event) => {
        event.preventDefault()
        try {
            console.log(`Username: ${username}\nPassword: ${password}`)
            const userInfoPayload = {
                username: username,
                password: password
            }
            const authorizedUser = await authServices.authenticateUser(userInfoPayload)
            // store username in sessionStorage for global access 
            window.sessionStorage.setItem('authenticatedUser', authorizedUser.username)
            setUser(authorizedUser.username)
            setUsername(null)
            setPassword(null)
            navigate('/')   // redirect to home
            showAlert('Logged in successfully!', 'success') // success alert
        } catch (error) {
            console.error('Error during Login : ', error);
            showAlert(`Error during Login : ${error.response.data.error}`, 'error') // error alert
        }
    }
    
    if(!open) return null;

    return(
            <Modal
                sx={modalStyle}
                open={open}
                onClose={handleClose}
                aria-labelledby="login-modal"
            >            
                <div style={centeredDivStyle}>
                    <Box sx={boxStyle}>
                        <Typography variant="h4" align="center">
                            Login
                        </Typography>
                        <div style={{display: 'flex', justifyContent:'center'}}>
                            <img src={Logo} alt='Logo' 
                                width={100} height={100} 
                                style={{paddingRight: '50px', paddingLeft: '25px'}}
                            />
                            <Typography variant="h5" align="center">
                                Symptom Checker and Triage System
                            </Typography> 
                        </div>
                        <form onSubmit={authenticateUser} style={formStyle}>
                            <TextField 
                                id="username"
                                type="text" 
                                label="Username"
                                placeholder="Username" 
                                variant="outlined"
                                required
                                autoComplete="username" // set autocomplete attribute
                                onChange={(e)=>setUsername(e.target.value)}
                            />
                            <TextField 
                                id="password"
                                type={showPassword ? "text" : "password"} 
                                label="Password"
                                placeholder="Password" 
                                variant="outlined"
                                required
                                autoComplete="current-password" // set autocomplete attribute
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    />
                                }
                                label="Show Password"
                            />
                            <FormHelperText id="helper-text">
                                <EnhancedEncryptionOutlined />
                                All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                                which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                            </FormHelperText>
                            <Button 
                                type="submit" 
                                endIcon={<LoginOutlined /> } 
                                variant="outlined" 
                                color="secondary"
                            >
                                Login!
                            </Button>
                        </form>
                        <Divider />
                        <Copyright />
                    </Box>
                </div>
            </Modal>
    )
}

LoginModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}