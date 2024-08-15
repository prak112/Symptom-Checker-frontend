import GitHubIcon from '@mui/icons-material/GitHub'
import { Stack, Typography } from '@mui/material'
import Copyright from './Copyright'

export default function Footer(){
    return(
        <footer>
            <strong>DISCLAIMER : </strong>
            <Typography>
                This is a work-in-progress project. This tool can produce false results.<br></br> 
                It is intended for informational and learning purposes only. 
                It is not a substitute for professional medical advice, diagnosis or treatment.<br></br> 
                If you think you may have a medical emergency, immediately call your doctor or dial 112.  
            </Typography>
            <hr></hr>
            <Stack id='author' direction='row' spacing={2} justifyContent='center'>
                <a href="https://github.com/prak112/ICD11-SymptomChecker" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                </a>
                <Copyright />
            </Stack>
            <hr></hr>
        </footer>
    )
}