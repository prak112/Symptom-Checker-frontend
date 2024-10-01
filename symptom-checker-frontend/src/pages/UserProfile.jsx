// react
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
// material UI
import { Typography, Button } from '@mui/material';
import { KeyboardReturnRounded } from '@mui/icons-material';


export default function UserProfile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate()

    // styles
    const centeredDivStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "50%",
        paddingTop: "100px",
        margin: "auto"
    }

    // Check if user is null or undefined
    if (!user) {
        return <Typography variant="h5">Loading...</Typography>;
    }

    return (
        <div style={centeredDivStyle}>
            <Typography variant="h5">User Information</Typography>
            <Typography variant="subtitle1">
                Username : {user ? user.toUpperCase() : 'N/A'}
            </Typography>
            <Typography variant="subtitle2">
                Using since : {user.registrationTime ? user.registrationTime : 'N/A'}
            </Typography>
            <Button 
                color="info"
                variant="outlined" 
                endIcon={<KeyboardReturnRounded />}
                onClick={() => navigate('/')}
            >
                Back
            </Button>
        </div>
    )
}
