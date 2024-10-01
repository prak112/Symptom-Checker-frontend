import axios from 'axios'

const baseUrl = '/public/auth'

// Create guest user
const createGuestUser = async() => {
    try {
        const response = await axios.post(`${baseUrl}/guest`)
        return response.data
    } catch (error) {
        console.error('Error during Guest User registration : ', error)        
    }
}

// Signup
const registerUser = async(userInformation) => {
    try {
        const response = await axios.post(`${baseUrl}/signup`, userInformation)
        return response.data
    } catch(error){
        console.error('Error during User registration: ', error)
        throw error
    }
}

// Login
const authenticateUser = async(userInformation) => {
    try {
        const response = await axios.post(`${baseUrl}/login`, userInformation)
        return response.data
    } catch (error) {
        console.error('Error during User login: ', error)
        throw error
    }
}

// Get User History - in services/symptoms.js

// Logout
const invalidateUserSession = async() => {
    try {
        await axios.post(`${baseUrl}/logout`)
    } catch (error) {
        console.error('Error during User session invalidation : ', error)
    }
}


export default {
    createGuestUser, 
    registerUser, 
    authenticateUser,
    invalidateUserSession,
}