/* global __API_BASE_URL__ */
import axios from 'axios'
axios.defaults.withCredentials = true

// export const API_BASE_URL = import.meta.env.VITE_API_PROTECTED
const API_BASE_URL = __API_BASE_URL__ + '/api/protected'

// POST - 'General' search result from symptoms lists
const getGeneralDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/symptoms/general`, symptoms)
        return response.data
    } catch (error) {
        console.error('Error during General search : ', error)
        throw error;
    }
}

// POST - 'Specific' search result from symptoms lists
const getSpecificDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/symptoms/specific`, symptoms)
        return response.data
    } catch (error) {
        console.error('Error during Specific search : ', error)
        throw error;
    }
}

// GET - Get User History
const getUserHistory = async() => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/history`)
        console.log('User History from Backend : ', response.data)
        return response.data
    } catch (error) {
        console.error('Error during User History retrieval : ', error)
        throw error;
    }
}

// DELETE - Remove User History item
const removeDiagnosisById = async(diagnosisId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/history`, diagnosisId)
        return response.status
    } catch (error) {
        console.error('Error deleting User History item : ', error)
        throw error;        
    }
}


export default { 
    getSpecificDiagnosis, 
    getGeneralDiagnosis,
    getUserHistory,
    removeDiagnosisById,
}