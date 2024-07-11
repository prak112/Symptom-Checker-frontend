
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExitToAppOutlined, HomeOutlined, Person, QuestionMark } from '@mui/icons-material';
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'


import PropTypes from 'prop-types';

export default function Sidebar({ open, toggleDrawer }){
    Sidebar.propTypes = {
        open: PropTypes.bool.isRequired,
        toggleDrawer: PropTypes.func.isRequired,
    }

    const sidebarStyles = {
        drawer: { 
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
                <Link to="/profile" style={sidebarStyles.link}>
                <ListItemButton sx={sidebarStyles.listItemButton}>
                    <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </Link>
                <Link to="/faqs" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <QuestionMark />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItemButton>
                </Link>
                <Link to="/logout" style={sidebarStyles.link}>
                    <ListItemButton sx={sidebarStyles.listItemButton}>
                        <ListItemIcon>
                            <ExitToAppOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </Link>
            </List>
        </Drawer>
    )
}



