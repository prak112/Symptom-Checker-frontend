// context
import { Typography, Button } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { KeyboardReturnRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div style={centeredDivStyle}>
            <Typography variant="h5">User Information</Typography>
            <Typography variant="subtitle1">
                Username : {user.toUpperCase()}
            </Typography>
            <Typography variant="subtitle2">
                Using since : {new Date(user.registrationTime).toLocaleString()}
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
