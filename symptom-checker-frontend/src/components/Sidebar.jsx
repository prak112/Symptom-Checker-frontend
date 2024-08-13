// React
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
// materialUI 
import { 
    Drawer, List, ListItemButton, ListItemIcon, ListItemText 
} from '@mui/material'
import { 
    ExitToAppOutlined, HomeOutlined, AppRegistrationOutlined, QuestionMark 
} from '@mui/icons-material'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
// resources
import Logo from '../assets/logo.svg'


export default function Sidebar({ open, toggleDrawer }){    
    // get user info
    const { user } = useContext(UserContext)
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
                <Link to="/" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <HomeOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Link>
                {/* if user authenticated render 'Profile' else 'Signup/Login' */}
                {user 
                ? (<Link to="/profile" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <PermIdentityOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                    </Link>)
                : (<Link to="/auth" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <AppRegistrationOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Sign up/Login" />
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
                ? (
                    <Link to="/auth?public=logout" style={sidebarStyles.link}>
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

