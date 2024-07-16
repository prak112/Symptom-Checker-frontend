import { ArrowBack, Send } from "@mui/icons-material"
import { Button, TextField, Box } from "@mui/material"
import Diagnosis from "./Diagnosis"
import { useState } from "react"
import { Link } from "react-router-dom"

import symptomsService from "../services/symptoms"

export default function SymptomForm(){
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [symptoms, setSymptoms] = useState([])
    const [diagnosis, setDiagnosis] = useState(null)

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
    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)
        const symptomsPayload = { 
            symptoms: symptoms
         }
        const diagnosisData = await symptomsService.getSpecificDiagnosis(symptomsPayload)
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

    // form-level validation


    // render Loading screen - loading true, submitted false
    if(loading){
        return (
        <Box sx={boxStyle}>
            <div>Communicating with ICD API...</div>
            <div>Loading results...</div>
        </Box>
        )
    }

/**
 * SETUP Radio Button for 'General'/'Specific' search of symptoms
 */

    // render Diagnosis in Card - loading false, submitted true
    /** render 'General' search = destinationEntities-->MatchingPVs-->label, score, foundationUri
     * Chip - diagnosisLabel - <div>label</div> 
     * Chip - diagnosisScore - <div>score</div>
     * Stack - diagnosisDetail - 
        * foundationUri LookUp = browserUrl, title["@value"], definition["@value"], longDefinition["@value"]
        * Button text - <div>Read More on ICD-11</div>
        * Route - Link to={browserUrl}
        * Box-Typography- 
            * title["@value"] - dark text, 
            * definition["@value"] - light text, 
            * if available, longDefinition["@value"] - fading text 
    **/
    /** render 'Specific' search = searchText, matchText, foundationUri, matchScore
     * Chip - diagnosisLabel - <div>matchText</div> 
     * Chip - diagnosisScore - <div>matchScore</div>
     * Stack - diagnosisDetail -  
        * foundationUri LookUp = browserUrl, title["@value"], definition["@value"], longDefinition["@value"]
        * same as for 'General' search
    **/ 

    if(submitted){
        return(
            <>
            <Diagnosis
                label={diagnosis.label} 
                score={diagnosis.score}
                url={diagnosis.url}
                title={diagnosis.title}
                detail={diagnosis.detail} />
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

