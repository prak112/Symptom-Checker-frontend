import axios from 'axios'

const baseUrl = '/public/auth'

// Signup
const registerUser = async(userInformation) => {
    try{
        const response = await axios.post(`${baseUrl}/signup`, userInformation)
        return response.data
    }
    catch(error){
        console.error('Error during registration: ', error)
        throw error
    }
}

// Login
const authenticateUser = async(userInformation) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, userInformation)
        return response.data
    } catch (error) {
        console.error('Error during login: ', error)
        throw error
    }
}

export default { registerUser, authenticateUser }