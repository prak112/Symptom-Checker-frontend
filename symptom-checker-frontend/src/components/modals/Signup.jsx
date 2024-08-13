// materialUI
import { Box, Button, Modal, Typography, Stack, Divider } from '@mui/material'
import { 
    TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
// react
import PropTypes from 'prop-types'
import Copyright from '../Copyright'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
// resources
import authServices from '../../services/auth'
import Logo from '../../assets/logo.svg'

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

export default function SignupModal({ open, handleClose }) {
    SignupModal.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    }
    // setup states
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()
    
    // reroute to login
    const loginRedirect = () => {
        navigate("/auth?public=login")
    }
    // Auth service handler
    const registerUser = async (event) => {
        event.preventDefault()
        try {
            console.log(`Username: ${username}\nPassword: ${password}`)
            const userInfoPayload = {
                username: username,
                password: password
            }
            const registrationResult = await authServices.registerUser(userInfoPayload)
            console.log('RESULT: ', registrationResult)
            setUsername(null)
            setPassword(null)
            // redirect user to login after successful registration 
            loginRedirect()
        } catch (error) {
            console.error('Error during registration : ', error);
        }
    }
    
    if(!open) return null;

    return (
        <div style={centeredDivStyle}>
            <Button onClick={open}></Button>
            <Modal
                sx={modalStyle}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
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
                    <form onSubmit={registerUser} style={formStyle}>
                        <TextField 
                            id="username"
                            type="text" 
                            label="Username"
                            placeholder="Username" 
                            variant="outlined"
                            required
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <TextField 
                            id="password"
                            type={showPassword ? "text" : "password"} 
                            label="Password"
                            placeholder="Password" 
                            variant="outlined"
                            required
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
                            All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                            which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                        </FormHelperText>
                        <Button type="submit" endIcon={<HowToRegIcon />} variant="outlined" color="secondary">
                            Sign Me up!
                        </Button>
                    </form>
                    <Divider />
                    <Stack spacing={2}>
                        <Typography variant="h6" align="center">
                            <Divider>Already existing User ?</Divider>
                        </Typography>
                        <Button onClick={loginRedirect} endIcon={<LoginOutlinedIcon />} variant="outlined" color="success" >
                            Login 
                        </Button>
                        <Divider />
                    </Stack>
                    <Copyright />
                </Box>
            </Modal>
        </div>
    );
}
