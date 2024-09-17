// material UI
import { KeyboardReturnOutlined } from '@mui/icons-material';
import { Box, FormHelperText, Typography, Button } from '@mui/material'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material'
// service
import symptomsService from '../services/symptoms'
// context
import { SubmitFormContext } from '../contexts/SubmitFormContext'
import { useState, useContext, useCallback, useEffect } from 'react'
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import { useNavigate } from 'react-router-dom';

// styles
const centeredDivStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "75%",
    paddingTop: "20px",
    margin: "0 auto"
}

export default function UserHistory() {
    const { submitted } = useContext(SubmitFormContext)
    const { isAuthenticated } = useContext(AuthenticationContext)
    const [data, setData] = useState([])
    const navigate = useNavigate()

    // handle return to Home
    const returnHome = () => navigate('/')

    // using context and monitoring for changes in submitted state
    const getUserDiagnosis = useCallback(async () => {
        const diagnosisTillNow = await symptomsService.getUserHistory()
        setData(diagnosisTillNow)
    }, [])

    useEffect(() => {
        if(isAuthenticated){ 
            getUserDiagnosis() 
        }
    }, [isAuthenticated, submitted, getUserDiagnosis])

    // verify empty history data
    if (!data || data.length === 0) {
        return (
            <Box sx={centeredDivStyle}>
                <Typography variant="body1">
                    Nothing from your past, yet! Go check some symptoms.
                </Typography>
            </Box>
        )
    }

    // Extract and modify necessary data
    const rows = data.diagnosis.flatMap(diagnosisItem => {
        return diagnosisItem.diagnosis.map((record) => ({
            symptom: record.symptom,
            analysis: record.analysis.toUpperCase(),
            diagnosedAt: new Date(record.diagnosedAt).toString(),
            topResult: record.topResult || {},
        }))
    })

    return(
        <Box sx={centeredDivStyle}>
            <Typography variant="h5">Diagnosis History</Typography>
            <FormHelperText variant="outlined" focused>
                <strong>*History only shows the top diagnosis for each symptom/search</strong>
            </FormHelperText>
            <Button
                display="flex"
                direction="row"
                type="submit" 
                endIcon={<KeyboardReturnOutlined />} 
                variant="outlined" 
                color="secondary"
                onClick={returnHome}
            >
                Back
            </Button>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '15%' }}>Symptom</TableCell>
                    <TableCell sx={{ width: '10%' }}>Analysis</TableCell>
                    <TableCell sx={{ width: '10%' }}>Diagnosed At</TableCell>
                    <TableCell sx={{ width: '10%' }}>Diagnosis</TableCell>
                    <TableCell sx={{ width: '10%' }}>Relevance</TableCell>
                    <TableCell sx={{ width: '40%' }}>Details</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell sx={{ width: '15%' }}>{row.symptom}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.analysis}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.diagnosedAt}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.topResult.title}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.topResult.score}%</TableCell>
                        <TableCell sx={{ width: '40%' }}>
                            {row.topResult.detail}<br/>
                            {row.topResult.url 
                                ? ( <a 
                                        href={row.topResult.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Read More
                                    </a>
                                ) : 'No Data Available'
                            }
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}
