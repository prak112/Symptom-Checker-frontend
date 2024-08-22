// react
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// material UI
import { ArrowBack } from '@mui/icons-material'  
import { Card, Box, Chip, Button, Divider, Typography } from '@mui/material'
// components
import TopDiagnosis from './TopDiagnosis'
import OtherDiagnosis from './OtherDiagnosis'

// styles
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  marginBottom: '5vh',  // vertical adjustment
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '4px',    // rounded corners
  width: '90%',        // container width
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
}

/**
 * Renders a Diagnosis component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.data - The diagnosis data.
 * @param {Function} props.handleReturn - The function to handle returning.
 * @returns {JSX.Element} The rendered Diagnosis component.
 */
export default function Diagnosis({ data, handleReturn }) {
  const symptom = data.symptom
  const topResult = data.topResult
  const includedResults = data.includedResults
  const excludedResults = data.excludedResults

  return(
    <Card variant="outlined" sx={cardStyle}>
      <Typography gutterBottom variant="h4" component="div">
        {symptom}
      </Typography>
      <Box>
        <TopDiagnosis 
          label={topResult.label}
          score={topResult.score}
          detail={topResult.detail}
          url={topResult.url}
        />
        <Divider>
          <Chip label="Suggested Diagnosis" color="secondary" size="small" />
        </Divider>
        <OtherDiagnosis 
          resultSet={includedResults} 
          type="included"  
        />
        <Divider>
          <Chip label="Excluded Diagnosis" color="info" size="small" />
        </Divider>
        <OtherDiagnosis 
          resultSet={excludedResults} 
          type="excluded" 
        />
        <Divider />
        <Button 
          component={Link} to="/" 
          endIcon={<ArrowBack />} 
          variant='outlined' 
          onClick={handleReturn} 
          sx={{ marginTop: '20px' }}
        >
          Check again ?
        </Button>
        <Typography sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          Total Results : {includedResults.label.length + excludedResults.label.length}
        </Typography>
      </Box>
    </Card>
  )
}

Diagnosis.propTypes = {
  data: PropTypes.shape({
    symptom: PropTypes.string.isRequired,
    topResult: PropTypes.object.isRequired,
    includedResults: PropTypes.object.isRequired,
    excludedResults: PropTypes.object.isRequired,
}).isRequired,
  handleReturn: PropTypes.func.isRequired,
};