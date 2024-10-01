// material UI
import { Box, Typography, CircularProgress, Button } from "@mui/material"
import { List, ListItem, ListItemText } from "@mui/material"
// react
import PropTypes from 'prop-types'


export default function WaitingDiagnosis({ handleReturn }){
    // styles
    const centeredDivStyle = {
        paddingTop: "20px",
        margin: "0 auto"
    }    
    const outerBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',    // rounded corners
        width: '50%',        // container width
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }


    return(
        <Box sx={outerBoxStyle}>
        <div style={centeredDivStyle}>
            <Typography variant="h6">Communicating with ICD API...</Typography>
            <CircularProgress color="secondary" />
            <Typography variant="body1">Loading results...</Typography>
            <List>
                <Typography variant="body2" gutterBottom sx={{ display: 'block' }}>
                    Diagnosis ETA :
                </Typography>
                <ListItem>
                    <ListItemText 
                        primary="General-Panel" 
                        secondary="~30 secs"
                        primaryTypographyProps={{ variant: "subtitle1" }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary="General-Assessment" 
                        secondary="~15 secs"
                        primaryTypographyProps={{ variant: "subtitle1" }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary="Specific-Panel" 
                        secondary="~1 sec"
                        primaryTypographyProps={{ variant: "subtitle1" }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}                            
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                        primary="Specific-Assessment" 
                        secondary="~1 secs"
                        primaryTypographyProps={{ variant: "subtitle1" }}
                        secondaryTypographyProps={{ variant: 'subtitle2' }}                        
                    />
                </ListItem>
            </List>
        </div>
        <Button
            onClick={handleReturn} 
            variant="outlined"
            color="warning"             
        >
            Cancel
        </Button>
    </Box>
    )
}

WaitingDiagnosis.propTypes = {
    handleReturn: PropTypes.func.isRequired,
}