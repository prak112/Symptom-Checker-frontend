// react
import { useNavigate } from 'react-router-dom';
// material UI
import { Delete, KeyboardReturnOutlined } from '@mui/icons-material';
import { Box, FormHelperText, Typography, Button, IconButton } from '@mui/material'
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
import { useAlert } from '../contexts/useAlert';

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
    const { submitted, setSubmitted } = useContext(SubmitFormContext)
    const { isAuthenticated } = useContext(AuthenticationContext)
    const showAlert = useAlert()
    const [data, setData] = useState([])
    const navigate = useNavigate()

    // handle return to Home
    const returnHome = () => {
        setSubmitted(false)
        navigate('/')
    }

    // using context and monitoring for changes in submitted state
    const getUserDiagnosis = useCallback(async () => {
        const diagnosisTillNow = await symptomsService.getUserHistory()
        setData(diagnosisTillNow)
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
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
            diagnosedAt: new Date(record.diagnosedAt).toLocaleString(),
            topResult: record.topResult || {},
            diagnosisId: record._id,
        }))
    })
    
    // call delete service function and refresh history
    const modifyDiagnosisHistory = (diagnosisId) => {
        if(window.confirm("You cannot undo this action.\nAre you sure you want to delete this diagnosis ?")) {
            deleteHistoryItem(diagnosisId)        
            const modifiedData = rows.filter(record => record.diagnosisId !== diagnosisId ? record : null)
            setData(modifiedData)
            showAlert('Diagnosis deleted successfully.', 'success')
        }
    }    
    // handle deletion of history records
    const deleteHistoryItem = async(diagnosisId) => {
        try {
            console.log('Deleting diagnosis history item...', diagnosisId)
            setSubmitted(false)
            await symptomsService.removeDiagnosisById(diagnosisId)
        } catch (error) {
            console.error('Error deleting Diagnosis : ', error);
            showAlert(`Error deleting Diagnosis : ${error.response.data.error}`, 'error') // error alert
        }
    }


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
                color="info"
                onClick={returnHome}
            >
                Back
            </Button>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '10%' }}>Symptom</TableCell>
                    <TableCell sx={{ width: '10%' }}>Analysis</TableCell>
                    <TableCell sx={{ width: '10%' }}>Time</TableCell>
                    <TableCell sx={{ width: '10%' }}>Diagnosis</TableCell>
                    <TableCell sx={{ width: '10%' }}>Relevance(%)</TableCell>
                    <TableCell sx={{ width: '50%' }}>Details</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.diagnosisId}>
                        <TableCell sx={{ width: '10%' }}>{row.symptom}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.analysis}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.diagnosedAt}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.topResult.title}</TableCell>
                        <TableCell sx={{ width: '10%' }}>{row.topResult.score}</TableCell>
                        <TableCell sx={{ width: '50%' }}>
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
                    <TableCell>
                        <IconButton 
                            aria-label="delete"
                            color="warning"
                            onClick={() => modifyDiagnosisHistory(row)}
                        >
                            <Delete />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    )
}
