import { useState } from "react"
import Diagnosis from "./Diagnosis"
import symptomCheckerService from "../services/symptoms"

import { ArrowBack, Send } from "@mui/icons-material"
import { Button, TextField, Box } from "@mui/material"
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup  } from "@mui/material"
import { Link } from "react-router-dom"


export default function SymptomForm(){
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [symptoms, setSymptoms] = useState("")
    const [diagnosis, setDiagnosis] = useState([])
    const [searchType, setSearchType] = useState('general')

    // center and border style
    const boxStyle = {
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

    // form-level validation and user-input sanitization

    
    // manage search type selection
    const handleSearchType = (event) => {
        setSearchType(event.target.value)
    }

    // manage symptom form submit to redirect request based on searchType
    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)
        const symptomsPayload = { 
            symptoms: symptoms.split(',').map((symptom) => symptom.trim()),
        }
        console.log('Symptoms List : ', symptomsPayload.symptoms)

        let diagnosisData = [];
        if(searchType === 'general'){
            diagnosisData = await symptomCheckerService.getGeneralDiagnosis(symptomsPayload)
            console.log('General Diagnosis DATA : ', diagnosisData)
        }
        else if(searchType === 'specific'){
            diagnosisData = await symptomCheckerService.getSpecificDiagnosis(symptomsPayload)
            console.log('Specific Diagnosis DATA : ', diagnosisData)
        }
        setDiagnosis(diagnosisData)
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
        }, 2000)    
    }
    
    // reroute back to SymptomForm
    const returnSymptomForm = () => {
        setSubmitted(false);
    }

    // render Loading screen - loading true, submitted false
    if(loading){
        return (
        <Box sx={boxStyle}>
            <div>Communicating with ICD API...</div>
            <div>Loading results...</div>
        </Box>
        )
    }

    if(submitted){
        return(
            <>
            <Diagnosis data={diagnosis} />
            <Button 
                component={Link} to="/" 
                endIcon={<ArrowBack />} 
                variant='outlined'
                onClick={returnSymptomForm}
            >
                Check again ?
            </Button>
            </>
        )
    }

    return(        
        <Box sx={boxStyle}>
            {/* render Symptom Form - by default, loading false, submitted false */}
            <h3 style={{textAlign: 'center'}}>List Symptoms briefly</h3>
            <form onSubmit={handleSubmit}>
                {/* symptoms text box */}
                <TextField 
                    id="outlined-basic" 
                    label="Symptoms"
                    placeholder="blocked nose, high fever,..." 
                    variant="outlined"
                    onChange={(e) => setSymptoms(e.target.value)}
                    required 
                />
                {/* symptom checker choice radio buttons */}
                <Box
                    height={100}
                    width={400}
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{ border: '2px solid grey', borderRadius: '10px' }}
                    >
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">
                            Choose Symptom Checker type
                        </FormLabel>
                        <RadioGroup row name="radio-buttons-group" onChange={handleSearchType} >
                            <FormControlLabel 
                                value="general" control={<Radio />} label="General" required/>
                            <FormControlLabel 
                                value="specific" control={<Radio />} label="Specific" required/>
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" endIcon={<Send />} variant='outlined' color='secondary'>
                        Diagnose
                    </Button>            
                </Box>
            </form>
        </Box>

    )
}

