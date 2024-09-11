/** DEBUG
 * AuthPrompt modal does not close after chosing 'Continue as Guest'
 * FRONTEND doesn't recognize registered Guest user, BACKEND recognizes Guest user
 * 'Diagnose' button works fine but UI doesn't change to <Diagnosis />
 */

// materialUI
import { Modal, Box, Button, Typography, Divider } from '@mui/material'
// react
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
// resources
import Logo from '../../assets/logo.svg'
// context
import { useContext } from 'react'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'



// styles
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
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
}


export default function AuthenticationPrompt({ open, handleClose }) {
   const { authenticateGuestUser } = useContext(AuthenticationContext)
   const navigate = useNavigate()

   // 
   const handleGuestLogin = () => {
      authenticateGuestUser()
      navigate('/')
   }

   const handleRegistration = () => {
      navigate('/auth?public=signup')
      handleClose()
   }


   return (
      <Modal open={open} onClose={handleClose}>
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
          <Typography variant="h6" component="h2">
            Welcome!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Would you like to continue as a Guest or as a registered User?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Button variant="contained" color="primary" onClick={handleGuestLogin}>
            Continue as Guest
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleRegistration}>
            Sign up / Login
          </Button>
        </Box>
      </Modal>
    )
}

AuthenticationPrompt.propTypes = {
open: PropTypes.bool.isRequired,
handleClose: PropTypes.func.isRequired,
}