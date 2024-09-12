// react
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
// component
import Diagnosis from "./Diagnosis"
// services
import symptomCheckerService from "../services/symptoms"
// material UI
import { Send } from "@mui/icons-material"
import { Button, TextField, Box, FormHelperText } from "@mui/material"
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup  } from "@mui/material"
// context
import { AuthenticationContext } from '../contexts/AuthenticationContext'
import { useAlert } from "../contexts/useAlert"
/**
 * DONE - Add UserContext/AuthenticateUserContext
 * Verify user in handleSubmit and save input to execute after authentication
    * If un-authenticated, Navigate user to <AuthenticateUser />
    * If authenticated, Create <UserHistory /> in <Sidebar />
 */


/**
 * Component for rendering a form to input symptoms and diagnose them.
 */
export default function SymptomForm(){
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [symptoms, setSymptoms] = useState("")
    const [diagnosis, setDiagnosis] = useState([])
    const [searchType, setSearchType] = useState("general")
    const [analysisType, setAnalysisType] = useState("panel")
    const navigate = useNavigate()
    const { isAuthenticated } = useContext(AuthenticationContext)
    const showAlert = useAlert()

    // styles
    const outerBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        // marginTop: '10vh',  // vertical adjustment
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',    // rounded corners
        width: '50%',        // container width
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
    const innerBoxStyle = {
        height: '100%',
        width: '90%', 
        border: '2px solid grey', 
        borderRadius: '10px', 
    }
    const centeredDivStyle = {
        width: "50%",
        paddingTop: "20px",
        margin: "0 auto"
    }


    // form-level validation and user-input sanitization
    const handleInputChange = (event) => {
        const { value } = event.target;
        const sanitizedValue = value.trim();
        const sanitizedInput = sanitizedValue.replace(/[^\w\s]/g, ",");
        setSymptoms(sanitizedInput);
    }
    
    // manage search and analysis type selections
    const handleSearchType = (event) => {
        setSearchType(event.target.value)
        console.log('Search type : ', searchType)        
    }

    const handleAnalysisType = (event) => {
        setAnalysisType(event.target.value)
        console.log('Analysis type: ', analysisType)
    }

    const handleUserVerification = () => {
        if(!isAuthenticated) {
            showAlert('User does not exist. Please register to access the service.', 'error')
            navigate('/auth?public=login');
        } 
        console.log('User verification complete')
    }

    // manage symptom form submit to redirect request based on searchType
    const handleSubmit = async(event) => {
        event.preventDefault()
        const symptomsPayload = { 
            symptoms: symptoms.split(',').map((symptom) => symptom.trim()),
            analysis: analysisType
        }
        console.log('Symptoms List : ', symptomsPayload)
        let diagnosisData = [];
        setLoading(true)

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
        <Box sx={outerBoxStyle}>
            <div style={centeredDivStyle}>
                <p>Communicating with ICD API...</p>
                <p>Loading results...</p>
                <p>Max Waiting Time for <em>&apos;General&apos;</em> search : <em>~12 seconds</em></p>
                <p>Max Waiting Time for <em>&apos;Specific&apos;</em> search : <em>~1 second</em></p>
            </div>
        </Box>
        )
    }

    if(submitted){
        return(
            <>
            {diagnosis.map((diagnosisBySymptom, index) =>
                <Box key={index} sx={outerBoxStyle}>
                    <Diagnosis data={diagnosisBySymptom} handleReturn={returnSymptomForm} />
                </Box> 
            )}
            </>
        )
    }

    return(        
        <Box sx={outerBoxStyle}>
            {/* render Symptom Form - by default, loading false, submitted false */}
            <h3 style={{textAlign: 'center'}}>List Symptoms briefly</h3>
            <form onSubmit={handleSubmit}>
                {/* symptoms text box */}
                <TextField 
                    id="outlined-basic"
                    label="Symptoms"
                    placeholder="blocked nose, high fever,..." 
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth={true}
                    required 
                />
                {/* symptom checker choice radio buttons */}
                <Box
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={innerBoxStyle}
                    >
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">
                            Choose Symptom Checker type
                        </FormLabel>
                        <RadioGroup 
                            row 
                            name="radio-buttons-group" 
                            defaultValue="general"
                            onChange={handleSearchType} 
                        >
                            <FormControlLabel 
                                value="general" control={<Radio />} label="General" />
                            <FormControlLabel 
                                value="specific" control={<Radio />} label="Specific" required/>
                        </RadioGroup>
                        <FormHelperText>
                            {/* simplify explanation */}
                            &apos;General&apos; - Multiple possible diagnosis.<br /> 
                            &apos;Specific&apos; - Top scored diagnosis.
                            <b><a title="Score is a value between 0 and 1. Higher the score, better the match."> (score calculated by  by ICD)</a></b>
                        </FormHelperText>
                        <RadioGroup 
                            row 
                            name="radio-buttons-group"
                            defaultValue="panel" 
                            onChange={handleAnalysisType} 
                        >
                            <FormControlLabel 
                                value="panel" 
                                control={<Radio />} 
                                label="Panel"
                                title="For diagnosing multiple symptoms at once" 
                                required
                            />
                            <FormControlLabel 
                                value="assessment" 
                                control={<Radio />} 
                                label="Assessment"
                                title="For detailed symptom-by-symptom diagnosis " 
                                required
                            />
                        </RadioGroup>
                        <FormHelperText>
                            {/* simplify explanation */}
                            &apos;Panel&apos; - Single diagnosis for all symptoms.<br />
                            &apos;Assessment&apos; - Multiple diagnoses for each symptom.
                        </FormHelperText>
                    </FormControl>
                    <Button
                        display="flex"
                        direction="row"
                        type="submit" 
                        endIcon={<Send />} 
                        variant='outlined' 
                        color='secondary'
                        onClick={handleUserVerification}
                    >
                        Diagnose
                    </Button>            
                </Box>
            </form>
        </Box>

    )
}

