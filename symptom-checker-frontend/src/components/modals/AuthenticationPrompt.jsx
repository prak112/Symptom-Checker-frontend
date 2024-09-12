// materialUI
import { Modal, Box, Button, Typography, Divider, FormHelperText, Stack } from '@mui/material'
import { Chalet, HowToRegOutlined } from '@mui/icons-material'
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

   // handle user registration preference
   const handleGuestLogin = () => {
      authenticateGuestUser()
      handleClose()
   }

   const handleRegistration = () => {
      navigate('/auth?public=signup')
      handleClose()
   }


   return (
      <Modal 
        open={open} 
        onClose={handleClose}
        aria-labelledby="auth-modal"
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
          <Typography variant="h6" component="h2">
            Welcome!
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Would you like to continue as a Guest or as a registered User?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Button 
                onClick={handleGuestLogin} 
                endIcon={<Chalet />} 
                variant="outlined" 
                color="info" 
            >
                Continue as Guest 
            </Button>
            <Button 
                type="submit" 
                endIcon={<HowToRegOutlined />} 
                variant="outlined" 
                color="secondary"
                onClick={handleRegistration}
            >
                Sign Me up!
            </Button>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <FormHelperText id="helper-text" sx={{ my: 2 }}>
            All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
            for both user types, Guests and Registered.<br/>
            <strong>Guest Users</strong> have <strong>temporary access</strong> to their search history.<br/>
            <strong>Registered Users</strong> have <strong>permanent access</strong> to their search history.
          </FormHelperText>
        </Box>
      </Modal>
    )
}

AuthenticationPrompt.propTypes = {
open: PropTypes.bool.isRequired,
handleClose: PropTypes.func.isRequired,
}