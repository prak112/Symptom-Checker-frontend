// import PropTypes from 'prop-types'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function UserProfile(){
    // get user info
    const { user } = useContext(UserContext)
    const centeredDivStyle = {
        width: "50%",
        paddingTop: "20px",
        margin: "0 auto"
    }
    return(
        <div style={centeredDivStyle}>
        <h3>{user}`s Profile</h3>
            ...coming soon...
        </div>
    )
}
