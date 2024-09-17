// context
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function UserProfile() {
    // styles
    const centeredDivStyle = {
        display: "flex",
        width: "50%",
        paddingTop: "20px",
        margin: "0 auto"
    }
    const { user } = useContext(UserContext);

    return (
        <div style={centeredDivStyle}>
            <p>
                Username : {user.toUpperCase()}
            </p>
        </div>
    )
}
