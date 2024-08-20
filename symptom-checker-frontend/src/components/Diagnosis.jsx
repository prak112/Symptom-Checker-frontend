// react
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//material UI
import { ArrowBack, Launch } from '@mui/icons-material'  
import { 
  Table, TableBody, TableCell, 
  TableHead, TableRow, TableContainer, Paper 
} from '@mui/material'
import { Card, Box, Button, Divider, Typography } from '@mui/material'

// styles
const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: 'auto',
  marginBottom: '10vh',  // vertical adjustment
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '4px',    // rounded corners
  width: '80%',        // container width
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
  // data validators
  const isUrl = (value) => typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://')); 
  const isScore = (value) => {
    const scoreRegex = /-?\d+(\.\d+)?/;
    return scoreRegex.test(value);
  }
  const isHtml = (value) => {
    return typeof value === 'string' && value.includes('<')
  }

  /** REFACTOR <Diagnosis />
   * <Diagnosis /> must be split into 2 sub-components to accomodate :
    * 'topResult' = <TopDiagnosis />
    * 'includedResults', 'excludedResults' = <OtherDiagnosis />
  * Render <TopDiagnosis /> with Label, Detail, Url and Score
  * Render <OtherDiagnosis /> as follows :
    * <Chip /> for results from 'includedResults' inside <Box /> with
      * Heading - 'Other Suggested Results'
      * Content - `${Label} : {Score}%`
      * Hyperlink with browserUrl
    *
    * <Chip /> for results from 'excludedResults' inside <Box /> with
      * Heading - 'Excluded Results'
      * Content - `${Label} : {Score}%`
      * Hyperlink with browserUrl
    *
    * Initially 5 results for each Result Set, 
      * when user clicks 'Show All {results.total}', render all.      
  **/

  return (
    <Card variant="outlined" sx={cardStyle}>
      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }} >
          <Table sx={{ minWidth: 650 }} aria-label="diagnosis table">
            <TableHead>
              <TableRow>
                {/* Assuming the first row of the table to be the categories from data object */}
                {Object.keys(data).map((category, index) => (
                  <TableCell 
                    key={index} 
                    align={index === 0 ? "inherit" : "right"}
                    sx={{ position: 'sticky', top: 0, backgroundColor: 'beige', zIndex: 1 }}
                    >
                    {category}
                  </TableCell>
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
                        endIcon={<Launch />}
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
          Total Results : n+1
        </Typography>
      </Box>
      <Divider />
    </Card>
  )
}

Diagnosis.propTypes = {
  data: PropTypes.object.isRequired,
  handleReturn: PropTypes.func.isRequired,
};