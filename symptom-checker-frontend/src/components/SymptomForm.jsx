import { Send } from "@mui/icons-material"
import { Button, FormControl, TextField, Box } from "@mui/material"

export default function SymptomForm(){
    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        marginTop: '10vh',  // vertical adjustment
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',    // rounded corners
        width: '50%',        // container width
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
    //<Input placeholder="List your symptoms briefly"></Input>
    return(
        <Box sx={boxStyle}>
            <h3 style={{textAlign: 'center'}}>List Symptoms briefly</h3>
            <FormControl defaultValue="" required>
                <TextField 
                    id="outlined-basic" 
                    label="Symptoms" 
                    placeholder="blocked nose, high fever,..." 
                    variant="outlined" />
                <Button endIcon={<Send />}>Diagnose</Button>
            </FormControl> 
        </Box>

    )
}

