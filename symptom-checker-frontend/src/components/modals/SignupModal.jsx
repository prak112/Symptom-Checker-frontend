/**User registration
 * setup services - DONE 
 * setup registration UI - DONE 
 * DEBUG-User registration fails without any error.
 * setup navigation to modal - 
**/
import PropTypes from 'prop-types'
import { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material'
import { 
    TextField, FormControlLabel, Checkbox, FormHelperText 
} from '@mui/material'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import authServices from '../../services/auth'

const boxStyle = {
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '30vh',
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

export default function SignupModal({ modalTitle }) {
    SignupModal.propTypes = {
        modalTitle: PropTypes.string.isRequired,
    }

    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(true)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    // Auth service handler
    const registerUser = async (event) => {
        event.preventDefault()
        console.log(`Username: ${username}\nPassword: ${password}`)
        const userInfoPayload = {
            username: username,
            password: password
        }
        const registrationResult = await authServices.registerUser(userInfoPayload)
        console.log('RESULT: ', registrationResult)
    }

    return (
        <div style={centeredDivStyle}>
            <Button onClick={handleOpen}>{modalTitle}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <Typography id="modal-heading" variant="h6" component="h2">
                        Sign Up!
                    </Typography>
                    <form onSubmit={registerUser} style={formStyle}>
                        <TextField 
                            id="username"
                            type="text" 
                            label="Username"
                            placeholder="Username" 
                            variant="outlined"
                            required="true"
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <TextField 
                            id="password"
                            type={showPassword ? "text" : "password"} 
                            label="Password"
                            placeholder="Password" 
                            variant="outlined"
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
                            All user data and symptom data is end-to-end encrypted.
                        </FormHelperText>   
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
