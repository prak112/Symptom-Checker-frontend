// react
// import PropTypes from 'prop-types'
import { useEffect, useState, useCallback } from 'react'
// material UI
import { Typography } from '@mui/material'
// service
import symptomsService from '../services/symptoms'


export default function UserProfile(){
    const [searchHistory, setSearchHistory] = useState({})

    // styles
    const centeredDivStyle = {
        width: "50%",
        paddingTop: "20px",
        margin: "0 auto"
    }

    // call symptoms service function
    const getUserDiagnosis = useCallback(() => {
        async() => {
            const diagnosisTillNow = await symptomsService.getUserHistory()
            setSearchHistory(diagnosisTillNow)
        }
    }, [])

    // monitor and refresh user history
    useEffect(() => {
        getUserDiagnosis()
    }, [searchHistory, getUserDiagnosis])


    return(
        <div style={centeredDivStyle}>
        <Typography variant="h5">Diagnosis History</Typography>
            <Typography variant="body2">...coming soon...</Typography>
        </div>
    )
}
