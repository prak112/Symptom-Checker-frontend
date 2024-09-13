// React
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
// materialUI 
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
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
                    width={60} height={60} 
                    />
                </ListItemIcon>
                {location.pathname !== '/' && (
                    <Link to="/" style={sidebarStyles.link}>
                        <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemIcon>
                                <HomeOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>
                )}
                {/* if user authenticated render 'Profile' else 'Signup/Login' */}
                {user 
                ? (<Link to="/history" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <PermIdentityOutlined />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                    </ListItemButton>
                    </Link>)
                : (<Link to="/auth?public=login" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <AppRegistrationOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                    </Link>)
                }
                <Link to="/faqs" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <QuestionMark />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItemButton>
                </Link>
                {/* if user authenticated render 'Logout' */}
                {user 
                ? (<Link to="/auth?public=logout" style={sidebarStyles.link}>
                        <ListItemButton sx={sidebarStyles.listItemButton}>
                            <ListItemIcon>
                                <ExitToAppOutlined />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
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

