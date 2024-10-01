// React
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
// materialUI 
import { Avatar, Drawer, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } 
from '@mui/material'
import { ExitToAppOutlined, HomeOutlined, AppRegistrationOutlined, QuestionMark, PermIdentityOutlined } 
from '@mui/icons-material'
// context
import { UserContext } from '../contexts/UserContext'
// resources
import Logo from '../assets/logo.svg'


export default function Sidebar({ open, toggleDrawer }){    
    // setup context and location
    const { user } = useContext(UserContext)
    const location = useLocation()

    // styles
    const sidebarStyles = {
        drawer: {
            background: 'linear-gradient(to right, #A3D1CC, #536B68)',
            width: 300, 
            flexShrink: 0 
        },
        list: {
            width: '100%', 
            maxWidth: 360, 
            bgcolor: 'background.paper', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between' 
        },
        logo: { 
            justifyContent: 'center', 
            display: 'flex', 
            my: 10 
        },
        listItemButton:{ 
            pl: 4 
        },
        link: { 
            textDecoration: 'none', 
            color: 'inherit' 
        }
    }
    
    return(
        <Drawer open={open} onClose={toggleDrawer} sx={sidebarStyles.drawer} >
            <List sx={sidebarStyles.list}>
                <ListItemIcon sx={sidebarStyles.logo}>
                    <img src={Logo} alt='Logo' 
                        width={100} height={100} 
                    />
                </ListItemIcon>
                {location.pathname !== '/' && (
                    <Link to="/" style={sidebarStyles.link}>
                        <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemAvatar>
                                <Avatar>
                                    <HomeOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Home" secondary="Symptom search window" />
                        </ListItemButton>
                    </Link>
                )}
                {/* if user authenticated render 'History' else 'Signup/Login' */}
                {user 
                ? (<Link to="/history" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PermIdentityOutlined />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText primary="History" secondary="Short-term (Guests) / Long-term (Registered Users)" />
                    </ListItemButton>
                    </Link>)
                : (<Link to="/auth?public=login" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AppRegistrationOutlined />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                    </Link>)
                }
                <Link to="/faqs" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemAvatar>
                                <Avatar>
                                    <QuestionMark />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText primary="FAQs" secondary="Clarify yourself about our services"/>
                    </ListItemButton>
                </Link>
                {/* if user authenticated render 'Logout' */}
                {user 
                ? (<Link to="/auth?public=logout" style={sidebarStyles.link}>
                        <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemAvatar>
                                <Avatar>
                                    <ExitToAppOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Logout" secondary="Exit the service"/>
                        </ListItemButton>
                    </Link>)
                : null}
            </List>
        </Drawer>
    )
}

Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    // registeredUser: PropTypes.string,
}

