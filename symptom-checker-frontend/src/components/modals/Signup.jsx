// materialUI
import { Box, Button, Modal, Typography, Stack, Divider } from '@mui/material'
import { 
    TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import { Chalet, HowToRegOutlined } from '@mui/icons-material';
import { LoginOutlined } from '@mui/icons-material';
// react
import PropTypes from 'prop-types'
import Copyright from '../Copyright'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
// resources
import Logo from '../../assets/logo.svg'
// services
// import authServices from '../../services/auth'
// context
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
// import { useAlert } from '../../contexts/useAlert';

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
    background: 'linear-gradient(to top, #FFC107 10%, #FFEB3B 90%)' // matt-yellow
    // background: 'linear-gradient(to bottom, #A3D1CC, #536B68)' // matt-green
}

/**
 * SignupModal component.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines if the modal is open or not.
 * @param {function} props.handleClose - The function to handle modal close event.
 * @returns {JSX.Element|null} The SignupModal component.
 */
export default function SignupModal({ open, handleClose }) {
    // setup states
    const navigate = useNavigate()
    // const [username, setUsername] = useState(null)
    // const [password, setPassword] = useState(null)
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [showPassword, setShowPassword] = useState(true)
    
    // setup context
    // const showAlert = useAlert()
    const { authenticateGuestUser, registerUser } = useContext(AuthenticationContext)

    // reroute to login
    const loginRedirect = () => {
        navigate("/auth?public=login")
    }

    // Credentials event handler
    const handleCredentialsChange = (event) => {
        const { name, value } = event.target
        setCredentials({ ...credentials, [name]: value })
    }

    // Auth service handler - TO Be Moved to <AuthenticationContext />
    // const registerUser = async (event) => {
    //     event.preventDefault()
    //     try {
    //         console.log(`Username: ${username}\nPassword: ${password}`)
    //         const userInfoPayload = {
    //             username: username,
    //             password: password
    //         }
    //         const registrationResult = await authServices.registerUser(userInfoPayload)
    //         console.log('RESULT: ', registrationResult)
    //         setUsername(null)
    //         setPassword(null)
    //         loginRedirect() // after successful registration
    //         showAlert('Signed up successfully!', 'success') // success alert
    //     } catch (error) {
    //         console.error('Error during Registration : ', error);
    //         showAlert(`Error during Registration : ${error.response.data.error}`, 'error')// error alert
    //     }
    // }

    // handle user registration preference
    const handleGuestLogin = () => {
        authenticateGuestUser()
        handleClose()
    }

    // Registration event handler
    const handleRegistration = (event) => {
        event.preventDefault()
        registerUser(credentials)
        loginRedirect()
    }
    
    if(!open) return null;

    return (
            <Modal
                sx={modalStyle}
                open={open}
                onClose={handleClose}
                aria-labelledby="signup-modal"
            >
                <div style={centeredDivStyle}>
                    <Box sx={boxStyle}>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <img src={Logo} alt='Logo' 
                            width={100} height={100} 
                            style={{paddingRight: '50px', paddingLeft: '25px'}}
                        />
                        <Typography variant="h5" align="center">
                            Symptom Checker and Triage System
                        </Typography> 
                    </div>
                        <form onSubmit={handleRegistration} style={formStyle}>
                            <TextField 
                                id="username"
                                name="username"
                                value={credentials.username}
                                type="text" 
                                label="Username"
                                placeholder="Username" 
                                variant="outlined"
                                required
                                onChange={handleCredentialsChange}
                            />
                            <TextField 
                                id="password"
                                name="password"
                                value={credentials.password}
                                type={showPassword ? "text" : "password"} 
                                label="Password"
                                placeholder="Password" 
                                variant="outlined"
                                required
                                onChange={handleCredentialsChange}
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
                                All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                                which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                            </FormHelperText>
                            <Button 
                                type="submit" 
                                endIcon={<HowToRegOutlined />} 
                                variant="outlined" 
                                color="secondary"
                            >
                                Sign Me up!
                            </Button>
                            <Divider />
                            <Stack spacing={2}>
                                <Button 
                                    onClick={handleGuestLogin} 
                                    endIcon={<Chalet />} 
                                    variant="outlined" 
                                    color="info" 
                                >
                                    Continue as Guest 
                                </Button>
                                <Divider />
                            </Stack>
                        </form>
                        <Divider />
                        <Stack spacing={2}>
                            <Typography variant="h6" align="center">
                                <Divider>Already existing User ?</Divider>
                            </Typography>
                            <Button 
                                onClick={loginRedirect} 
                                endIcon={<LoginOutlined />} 
                                variant="outlined" 
                                color="success" 
                            >
                                Login 
                            </Button>
                            <Divider />
                        </Stack>
                        <Copyright />
                    </Box>
                </div>
            </Modal>
    );
}

SignupModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}