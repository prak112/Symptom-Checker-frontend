// react
import { useLocation } from 'react-router-dom'
// materialUI
import { Box } from '@mui/material'
// components
import Diagnosis from './Diagnosis'


export default function DisplayDiagnosis() {
    const location = useLocation()
    const { diagnosisData, handleReturnHome } = location.state

    // styles
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
        <>
        {diagnosisData.map((diagnosisBySymptom, index) =>
            <Box key={index} sx={outerBoxStyle}>
                <Diagnosis data={diagnosisBySymptom} handleReturn={handleReturnHome} />
            </Box> 
        )}
        </>
    )
}