/*eslint-disable*/

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../assets/logo.svg'

export default function Header({ toggleDrawer }){
    const gradientStyle = { 
        background: 'linear-gradient(45deg, #FFC107 30%, #FFEB3B 90%)' 
    }
    return(
        <AppBar position="relative" sx={gradientStyle} >
            <Toolbar>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    onClick={toggleDrawer}
                >
                    <MenuIcon fontSize='large' />
                </IconButton>
                <img src={Logo} alt='Logo' 
                    width={75} height={75} 
                    style={{paddingRight: '50px', paddingLeft: '25px'}}/> 
                <Typography variant="h5" align='justify'>
                    Symptom Checker
                </Typography>
            </Toolbar>
        </AppBar>
    )    
}
