import { ArrowBack, Send } from "@mui/icons-material"
import { Button, TextField, Box } from "@mui/material"
import Diagnosis from "./Diagnosis"
import { useState } from "react"
import { Link } from "react-router-dom"

import symptomsService from "../services/symptoms"

export default function SymptomForm(){
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [symptoms, setSymptoms] = useState('')
    
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
    
    // manage loading and submitted states
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true) 
        symptomsService.getQuickDiagnosis(symptoms)
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
        }, 2000)    
    }
    
    // reroute back to SymptomForm
    const returnSymptomForm = () => {
        setSubmitted(false);
    }

    // form-level validation


    // loading true, submitted false - render Loading screen
    if(loading){
        return (
        <Box sx={boxStyle}>
            <div>Communicating with ICD API...</div>
            <div>Loading results...</div>
        </Box>
        )
    }
    // loading false, submitted true - render Diagnosis    
    if(submitted){
        return(
            <>
            <Diagnosis />
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
            {/* by default, loading false, submitted false - render Form */}
            <h3 style={{textAlign: 'center'}}>List Symptoms briefly</h3>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    label="Symptoms" 
                    placeholder="blocked nose, high fever,..." 
                    variant="outlined"
                    onChange={(e) => setSymptoms(e.target.value)} 
                    />
                <Button type="submit" endIcon={<Send />}>
                    Diagnose
                </Button>
            </form>
        </Box>

    )
}

