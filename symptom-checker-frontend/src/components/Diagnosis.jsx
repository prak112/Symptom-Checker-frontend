import PropTypes from 'prop-types'

// for info display
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import LaunchIcon from '@mui/icons-material/Launch'  
import { 
  Table, TableBody, TableCell, 
  TableHead, TableRow, TableContainer, Paper 
} from '@mui/material'
import { Button } from '@mui/material'
import Divider from '@mui/material/Divider'
//import Stack from '@mui/material/Stack'

// for uniform font style
import Typography from '@mui/material/Typography'

// for Triage System design 
// import Chip from '@mui/material/Chip'
// import { createTheme } from '@mui/material/styles'


export default function Diagnosis({ data }) {
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
    width: '80%',        // container width
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  }
  
  Diagnosis.propTypes = {
    data: PropTypes.object.isRequired
  };

  const isUrl = (value) => typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')); 
  const isScore = (value) => {
    const scoreRegex = /-?\d+(\.\d+)?/;
    return scoreRegex.test(value);
  }
  const isHtml = (value) => {
    return typeof value === 'string' && value.includes('<')
  }

  return (
    <Card variant="outlined" sx={cardStyle}>
      <Box sx={{ p: 2 }}>
      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }} >
        <Table sx={{ minWidth: 650 }} aria-label="diagnosis table">
          <TableHead>
            <TableRow>
              {/* Assuming the first row of the table to be the categories from data object */}
              {Object.keys(data).map((category, index) => (
                <TableCell key={index} align={index === 0 ? "inherit" : "right"}>{category}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {/* Assuming each array in your data object has the same length */}
          {data[Object.keys(data)[0]].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
            {Object.keys(data).map((category, colIndex) => (
              <TableCell key={colIndex} align={colIndex === 0 ? "inherit" : "right"}>
                {isUrl(data[category][rowIndex]) ? (
                  <Button 
                    variant='outlined'
                    endIcon={<LaunchIcon />}
                    href={data[category][rowIndex]} 
                    target="_blank" rel="noopener noreferrer">
                    Read More
                  </Button>
                ) : isScore(data[category][rowIndex]) ? (
                  <Typography variant="body2" color="primary">
                    {Math.round((+(data[category][rowIndex]) * 100), 2)}%
                  </Typography>
                ) : isHtml(data[category][rowIndex]) ? (
                  <Typography variant="body2" dangerouslySetInnerHTML={{ __html: data[category][rowIndex] }} />
                ) : (
                  <Typography variant="body2">{data[category][rowIndex]}</Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Box>
      <Divider />
    </Card>
  )
}