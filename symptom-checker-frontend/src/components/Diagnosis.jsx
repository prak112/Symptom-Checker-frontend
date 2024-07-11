import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
//import { createTheme } from '@mui/material/styles';

export default function Diagnosis() {
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
            Diagnosis Score
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            55%
          </Typography>
        </Stack>
        <Typography color="text.secondary" variant="body2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea, architecto.
          Possible neurological disorder.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
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
      </Box>
    </Card>
  );
}
