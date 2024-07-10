
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
    
    return(
        <Drawer open={open} onClose={toggleDrawer} >
            <List>
                <ListItemIcon>
                    <img src={Logo} alt='Logo' width={60} height={60} style={{padding: 10, margin: 10}} />
                </ListItemIcon>
                <Link to="/home">
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </Link>
                <Link to="/profile">
                    <ListItemButton>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </Link>
                <Link to="/faqs">
                    <ListItemButton>
                        <ListItemIcon>
                            <QuestionMark />
                        </ListItemIcon>
                        <ListItemText primary="FAQs" />
                    </ListItemButton>
                </Link>
                <Link to="/logout">
                    <ListItemButton>
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



