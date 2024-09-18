// react
import PropTypes from 'prop-types'
// context
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext';
// materialUI
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { blueGrey } from '@mui/material/colors';
import { Link } from 'react-router-dom'
// resources
import Logo from '../assets/logo.svg'

export default function Header({ toggleDrawer }){
    // get user info
    const { user } = useContext(UserContext)
    const appBarStyle = {
        display: "flex",
        justifyContent: "space-between",
        background: "linear-gradient(45deg, #FFC107 30%, #FFEB3B 90%)",
        py: 2,  // padding top, bottom
        mr: 2,  // margin right
    }
    const toolBarStyle = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
    }
    const avatarStyle = {
        bgcolor: blueGrey['A400'],
    }
    const imgStyle = {
        display: 'block',
        paddingRight: '50px', 
        paddingLeft: '25px',
    }

    return(
        <AppBar position="relative" sx={appBarStyle} >
            <Toolbar sx={toolBarStyle}>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={toggleDrawer}
                >
                    <MenuIcon fontSize='large' />
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
                <Link to="/profile">
                    <Avatar 
                        sx={avatarStyle} 
                        variant="rounded"
                        alt={user.username}
                    >
                        <PermIdentityOutlinedIcon />
                    </Avatar>
                </Link>
                )
                : null}
            </Toolbar>
        </AppBar>
    )    
}

Header.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    // registeredUser: PropTypes.string,
}