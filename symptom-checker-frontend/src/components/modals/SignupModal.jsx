import PropTypes from 'prop-types'
import { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material'
import { 
    TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';

import authServices from '../../services/auth'
import Logo from '../../assets/logo.svg'

const boxStyle = {
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '50vh',
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

export default function SignupModal({ modalTitle, open, handleClose }) {
    SignupModal.propTypes = {
        modalTitle: PropTypes.string.isRequired,
        open: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
    }
    
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()

    // Auth service handler
    const registerUser = async (event) => {
        event.preventDefault()
        console.log(`Username: ${username}\nPassword: ${password}`)
        const userInfoPayload = {
            username: username,
            password: password
        }
        try {
            const registrationResult = await authServices.registerUser(userInfoPayload)
            console.log('RESULT: ', registrationResult)
            navigate('/')
        } catch (error) {
            console.error('Error during registration : ', error);
        }
    }

    return (
        <div style={centeredDivStyle}>
            <Button onClick={open}>{modalTitle}</Button>
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
                        <Button type="submit" endIcon={<HowToRegIcon />} variant='outlined' color='secondary'>
                            Sign Me up!
                        </Button>
                        <FormHelperText id="helper-text">
                            All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                            which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                        </FormHelperText>
                           
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
