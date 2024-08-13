// materialUI
import { Box, Button, Modal, Typography, Divider } from '@mui/material'
import { TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import { Login } from '@mui/icons-material'
import EnhancedEncryptionOutlined from '@mui/icons-material/EnhancedEncryptionOutlined';
// react
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

export default function LoginModal({ open, handleClose }){
    LoginModal.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
    }
    // setup states
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()

    // Auth service handler
    const authenticateUser = async (event) => {
        event.preventDefault()
        try {
            console.log(`Username: ${username}\nPassword: ${password}`)
            const userInfoPayload = {
                username: username,
                password: password
            }
            const authenticatedUser = await authServices.authenticateUser(userInfoPayload)
            // store username in sessionStorage for global access 
            window.sessionStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser))
            console.log('RESULT: ', authenticatedUser)
            setUsername(null)
            setPassword(null)
            navigate('/')   // redirect to home
        } catch (error) {
            console.error('Error during registration : ', error);
        }
    }
    
    if(!open) return null;

    return(
        <>
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
                            <EnhancedEncryptionOutlined />
                            All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                            which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                        </FormHelperText>
                        <Button type="submit" endIcon={<Login />} variant="outlined" color="secondary">
                            Login!
                        </Button>
                    </form>
                    <Divider />
                </Box>
                </Modal>
            </div>
        </>
    )
}