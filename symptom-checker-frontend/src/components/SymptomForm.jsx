// react
// import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
// component
import Diagnosis from "./Diagnosis"
import WaitingDiagnosis from "./WaitingDiagnosis"
// services
import symptomCheckerService from "../services/symptoms"
// material UI
import { Send } from "@mui/icons-material"
import { Button, TextField, Box, FormHelperText } from "@mui/material"
import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup  } from "@mui/material"
// context
import { SubmitFormContext } from "../contexts/SubmitFormContext"


/**
 * Component for rendering a form to input symptoms and diagnose them.
 */
export default function SymptomForm() {
    // const navigate = useNavigate()
    // setup context
    const { submitted, setSubmitted } = useContext(SubmitFormContext)
    // setup state
    const [loading, setLoading] = useState(false)
    const [symptoms, setSymptoms] = useState("")
    const [diagnosis, setDiagnosis] = useState([])
    const [searchType, setSearchType] = useState("")
    const [analysisType, setAnalysisType] = useState("")


    // styles - OLD
    // const outerBoxStyle = {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     margin: 'auto',
    //     padding: '10px',
    //     border: '1px solid #ccc',
    //     borderRadius: '5px',    // rounded corners
    //     width: '50%',        // container width
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    // }
    // const innerBoxStyle = {
    //     justifyContent: 'center',
    //     height: '100%',
    //     width: '90%', 
    //     border: '2px solid grey', 
    //     borderRadius: '10px', 
    // }

    // styles - NEW
    const outerBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '100%',
        maxWidth: '700px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        '@media (min-width: 600px)': {
            width: '70%',
        },
        '@media (min-width: 960px)': {
            width: '50%',
        }
    }
    
    const innerBoxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        padding: '10px',
        width: '100%',
        border: '2px solid grey',
        borderRadius: '10px',
    }


    // EVENT HANDLERS
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
            analysis: `${searchType}-${analysisType}`
        }
        console.log('Symptoms List : ', symptomsPayload)
        setAnalysisType("")
        setSearchType("")
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
        setLoading(false)
        setSubmitted(false);
    }


    // CONDITIONAL RENDERING COMPONENTS
    // render Loading screen
    if(loading){
        console.log('Rendering loading screen...')
        return <WaitingDiagnosis handleReturn={returnSymptomForm}/>
    }

    // render Diagnosis
    if(submitted){ // TO BE IMPLEMENTED - forward results to <DisplayDiagnosis /> 
        console.log('Rendering Diagnosis screen...')

        return(
            <>
            {diagnosis.map((diagnosisBySymptom, index) =>
                <Box key={index} sx={outerBoxStyle}>
                    <Diagnosis data={diagnosisBySymptom} handleReturn={returnSymptomForm} />
                </Box> 
            )}
            </>
        )
        // navigate('/diagnosis', {
        //     state: {
        //         diagnosisData: diagnosis,
        //         handleReturnHome: returnSymptomForm,
        //     }
        // })
    }

    /**
     * TO BE IMPLEMENTED - <TabPanel />
     */
    // render Symptom form
    return(        
        <Box sx={outerBoxStyle}>
            <h3 style={{textAlign: 'center'}}>List Symptoms briefly</h3>
            <form onSubmit={handleSubmit} required>
                {/* Symptoms text box */}
                <TextField 
                    id="outlined-basic"
                    label="Symptoms"
                    placeholder="blocked nose, high fever,..." 
                    variant="outlined"
                    onChange={handleInputChange}
                    fullWidth={true}
                    required 
                />
                {/* SEARCH and ANALYIS preferences */}
                <Box
                    my={4}
                    // display="flex"
                    // alignItems="center"
                    // gap={4}
                    // p={2}
                    sx={innerBoxStyle}
                    >
                    {/* Search preference */}
                    <FormControl px={4}>
                        <FormLabel 
                            id="search-type-radio-group"
                            sx={{ color: 'InfoText' }}
                        >
                            Choose Search type
                        </FormLabel>
                        <RadioGroup 
                            row 
                            name="diagnosis-type-group" 
                            onChange={handleSearchType}
                            required 
                        >
                        <Box 
                            display="flex" 
                            flexDirection="column" 
                            alignItems="flex-start"
                        >
                            <FormControlLabel 
                                value="general" 
                                control={<Radio />} 
                                label="General"
                                sx={{ color: 'MenuText' }}
                                required 
                            />
                            <FormHelperText 
                                sx={{ color: 'CaptionText' }}
                            >
                                Multiple possible diagnosis
                            </FormHelperText>
                        </Box>
                        <Box
                            display="flex" 
                            flexDirection="column" 
                            alignItems="flex-start"
                        >        
                            <FormControlLabel
                                value="specific" 
                                control={<Radio />} 
                                label="Specific"
                                sx={{ color: 'MenuText' }}
                                required 
                            />
                            <FormHelperText
                                sx={{ color: 'CaptionText' }}
                            >
                            Top scoring diagnosis<strong>
                                <a title="Score is a value between 0 and 1. 
                                    Higher the score, better the match."
                                > (calculated by ICD)</a>
                            </strong>
                            </FormHelperText>
                        </Box>
                        </RadioGroup>
                    
                    {/* padding box */}
                    <Box                
                        display="flex" 
                        flexDirection="column" 
                        alignItems="flex-start"
                        p={2}
                    />

                    {/* Analysis preference */}
                        <FormLabel 
                            id="analysis-type-radio-group"
                            sx={{ color: 'InfoText' }}
                        >
                            Choose Analysis type
                        </FormLabel>
                        <RadioGroup 
                            row 
                            name="analysis-type-group"
                            onChange={handleAnalysisType}
                            required 
                        >
                        <Box                
                            display="flex" 
                            flexDirection="column" 
                            alignItems="flex-start"
                        >
                            <FormControlLabel 
                                value="panel" 
                                control={<Radio />} 
                                label="Panel"
                                title="For diagnosing multiple symptoms at once"
                                sx={{ color: 'MenuText' }}
                                required  
                            />
                            <FormHelperText
                                sx={{ color: 'CaptionText' }}
                            >
                                <em>Consolidated</em> diagnosis
                            </FormHelperText>
                        </Box>
                        <Box
                            display="flex" 
                            flexDirection="column" 
                            alignItems="flex-start"
                        >
                            <FormControlLabel 
                                value="assessment" 
                                control={<Radio />} 
                                label="Assessment"
                                title="For detailed symptom-by-symptom diagnosis"
                                sx={{ color: 'MenuText' }}
                                required  
                            />
                            <FormHelperText
                                sx={{ color: 'CaptionText' }}
                            >
                                <em>Symptom-by-Symptom</em> diagnosis
                            </FormHelperText>
                        </Box>                            
                        </RadioGroup>
                    </FormControl>

                </Box>
                {/* Diagnose button */}
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

