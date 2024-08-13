import Link from '@mui/material/Link'
import { Typography } from '@mui/material';

export default function Copyright(){
    return (
      <Typography variant="body2" color="text.secondary" align="center" >
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/prak112/ICD11-SymptomChecker/blob/main/LICENSE">
          ICD Symptom Checker | Prakirth Govardhanam
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    );
}