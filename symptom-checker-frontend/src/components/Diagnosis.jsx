import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
//import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
//import { createTheme } from '@mui/material/styles';

import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function Diagnosis({ label, score, url, title, detail }) {
  // center and border style
  const cardStyle = {
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
  
  Diagnosis.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired
  };

  // check custom-colors MUI
  // const theme = createTheme({
  //   palette: {
  //     ochre: {
  //       main: '#E3D026',
  //       light: '#E9DB5D',
  //       dark: '#A29415',
  //       contrastText: '#242105',
  //     },
  //   },
  // });

  return (
    <Card variant="outlined" sx={cardStyle}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {label}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Diagnosis Score : {+score * 100}%
          </Typography>
        </Stack>
        <Typography color='InfoText' >
          {title}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {detail}
        </Typography>
        <Button variant='outlined' href={url}>
          Read More on ICD-11
        </Button>
      </Box>
      <Divider />
      
{/*  TO DO: Understand and build Triage system logic  */}

      {/* <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="body2">
          Condition Urgency Level
        </Typography>
        <Stack direction="column" spacing={1}>
          <Chip color='error' label="Level 1- Immediate Threat" size="small" />
          <Chip color='warning' label="Level 2- Emergency" size="small" />
          <Chip color='secondary' label="Level 3- Urgent" size="small" />
          <Chip color='primary' label="Level 4- Semi Urgent" size="small" />
          <Chip color='info' label="Level 5- Non-Urgent" size="small" />
        </Stack>
      </Box> */}
    </Card>
  );
}


/** How to pass diagnosis data from SymptomForm.jsx returned from backend API to Diagnosis.jsx ---
 *  Set state variable to handle data from symptomsService.getDiagnosis ?
 *  Lift components state to Parent Component, App.jsx ?
 *  Manage components rendering in SymptomForm.jsx ?
 */