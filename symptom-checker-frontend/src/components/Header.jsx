// react
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
// context
import { UserContext } from '../contexts/UserContext';
// materialUI
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { Menu, PermIdentityOutlined } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
// resources
import Logo from '../assets/logo.svg'

export default function Header({ toggleDrawer }){
    // get user info
    const { user } = useContext(UserContext)
    const appBarStyle = {
        display: 'flex',
        margin: '0px auto',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #FFC107 30%, #FFEB3B 90%)',
        paddingLeft: '25px',
        paddingRight: '50px', 
        py: 2,  // padding top, bottom
    }
    const toolBarStyle = {
        marginLeft: '50px',
        marginRight: '78px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    }
    const avatarStyle = {
        marginLeft: '50px',
        marginRight: '50px',
        bgcolor: deepPurple['300'],
    }
    const imgStyle = {
        display: 'block',
        marginLeft: '50px',
        marginRight: '50px',
        paddingLeft: '25px',
        paddingRight: '50px', 
    }

    return(
        <AppBar position="relative" sx={appBarStyle} >
            <Toolbar sx={toolBarStyle}>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={toggleDrawer}
                    size="small"
                >
                    <Menu fontSize="large" />
                </IconButton>
                <Link to="/">
                    <img src={Logo} alt='Logo' 
                        width={75} height={75} 
                        style={imgStyle}
                    />
                </Link>
                <Typography variant="h4" align="center" color="primary">
                    Symptom Checker
                </Typography> 
                {user 
                ? (
                <Box
                    display="flex" 
                    flexDirection="column" 
                    alignItems="flex-end"
                >
                    <Link to="/profile">
                        <Avatar 
                            sx={avatarStyle} 
                            variant="circular"
                            alt={user.username}
                        >
                            <PermIdentityOutlined fontSize="large" />
                        </Avatar>
                    </Link>
                </Box>
                )
                : null}
            </Toolbar>
        </AppBar>
    )    
}

Header.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
}