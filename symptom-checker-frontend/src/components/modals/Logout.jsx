import PropTypes from 'prop-types'
import { Modal, Box, Typography, Button, FormHelperText } from "@mui/material"
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EnhancedEncryptionOutlined from '@mui/icons-material/EnhancedEncryptionOutlined';

// styles
const boxStyle = {
    display: 'grid',
    background: 'linear-gradient(to bottom, #FFC107 10%, #FFEB3B 90%)', // matt-yellow
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
const centeredDivStyle = {
    width: "50%",
    paddingTop: "20px",
    margin: "0 auto"
}
const modalStyle = {
    // background: 'linear-gradient(to top, #FFC107 10%, #FFEB3B 90%)' // matt-yellow
     background: 'linear-gradient(to bottom, #A3D1CC, #536B68)' // matt-red
}

export default function LogoutModal({ open, handleClose, handleLogout }){
    LogoutModal.propTypes = {
        open: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired,
    }

    return(
        <div style={centeredDivStyle}>
            <Modal
                    sx={modalStyle}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >            
                <Box sx={boxStyle}>
                    <Typography variant="h4" align="center" color="darkred">
                        Confirm Logout
                    </Typography>
                    <FormHelperText id="helper-text">
                            <EnhancedEncryptionOutlined />
                            All your data and symptom data is <em>ALWAYS end-to-end encrypted</em>,
                            which means only <em>YOU</em> see the real data, others see encrypted gibberish.
                    </FormHelperText>
                    <Button 
                        onClick={handleLogout}
                        variant="contained" 
                        color="warning" 
                        endIcon={<LogoutOutlinedIcon />}>
                        Logout ?
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}