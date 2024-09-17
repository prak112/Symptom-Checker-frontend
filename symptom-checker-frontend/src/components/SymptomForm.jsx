// react
import { useContext, useState } from "react"
// component
import Diagnosis from "./Diagnosis"
// services
import symptomCheckerService from "../services/symptoms"
// material UI
import { Send } from "@mui/icons-material"
import { Button, TextField, Box, FormHelperText, CircularProgress, Typography } from "@mui/material"
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup  } from "@mui/material"
import { List, ListItem, ListItemText } from "@mui/material"
// context
import { SubmitFormContext } from "../contexts/SubmitFormContext"
import { useNavigate } from "react-router-dom"


/**
 * Component for rendering a form to input symptoms and diagnose them.
 */
export default function SymptomForm(){
    const { submitted, setSubmitted } = useContext(SubmitFormContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [symptoms, setSymptoms] = useState("")
    const [diagnosis, setDiagnosis] = useState([])
    const [searchType, setSearchType] = useState("general")
    const [analysisType, setAnalysisType] = useState("panel")


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

    const returnSymptomForm = () => {
        setSubmitted(false);
    }

    // render Loading screen - loading true, submitted false
    if(loading){
        return (
        <Box sx={outerBoxStyle}>
            <div style={centeredDivStyle}>
                <Typography variant="h6">Communicating with ICD API...</Typography>
                <CircularProgress color="secondary" />
                <Typography variant="body1">Loading results...</Typography>
                <List>
                    <Typography variant="body2" gutterBottom sx={{ display: 'block' }}>
                        Diagnosis ETA :
                    </Typography>
                    <ListItem>
                        <ListItemText 
                            primary="General-Panel" 
                            secondary="~30 secs"
                            primaryTypographyProps={{ variant: "subtitle1" }}
                            secondaryTypographyProps={{ variant: 'subtitle2' }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary="General-Assessment" 
                            secondary="~15 secs"
                            primaryTypographyProps={{ variant: "subtitle1" }}
                            secondaryTypographyProps={{ variant: 'subtitle2' }}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary="Specific-Panel" 
                            secondary="~1 sec"
                            primaryTypographyProps={{ variant: "subtitle1" }}
                            secondaryTypographyProps={{ variant: 'subtitle2' }}                            
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary="Specific-Assessment" 
                            secondary="~1 secs"
                            primaryTypographyProps={{ variant: "subtitle1" }}
                            secondaryTypographyProps={{ variant: 'subtitle2' }}                        
                        />
                    </ListItem>
                </List>
            </div>
            <Button
                onClick={() => navigate('/')} 
                variant="outlined"
                color="secondary"             
            >
                Cancel
            </Button>
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
                            Choose Symptom diagnosis type
                        </FormLabel>
                        <RadioGroup 
                            row 
                            name="radio-buttons-group" 
                            defaultValue="general"
                            onChange={handleSearchType} 
                        >
                            <FormControlLabel 
                                value="general" 
                                control={<Radio />} 
                                label="General"
                                required 
                            />
                            <FormHelperText>
                            Multiple possible diagnosis.
                            </FormHelperText>
                            <FormControlLabel 
                                value="specific" 
                                control={<Radio />} 
                                label="Specific" 
                                required 
                            />
                            <FormHelperText>
                            Top scoring diagnosis<strong>
                                <a title="Score is a value between 0 and 1. Higher the score, better the match."> (calculated by ICD)</a>
                            </strong>
                            </FormHelperText>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">
                            Choose Analysis type
                        </FormLabel>
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
                            <FormHelperText>
                                <em>Consolidated</em> diagnosis for all symptoms.
                            </FormHelperText>
                            <FormControlLabel 
                                value="assessment" 
                                control={<Radio />} 
                                label="Assessment"
                                title="For detailed symptom-by-symptom diagnosis " 
                                required
                            />
                            <FormHelperText>
                                <em>Symptom-by-Symptom</em> diagnosis.
                            </FormHelperText>
                        </RadioGroup>
                    </FormControl>       
                </Box>
                <Button
                    display="flex"
                    direction="row"
                    type="submit" 
                    endIcon={<Send />} 
                    variant="outlined" 
                    color="secondary"
                >
                    Diagnose
                </Button>     
            </form>
        </Box>

    )
}

