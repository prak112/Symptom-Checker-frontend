import axios from 'axios'

const baseUrl = '/api/protected/symptoms'

// POST - 'Specific' search result from symptoms lists
const getSpecificDiagnosis = async(symptomsList) => {
    try {
        const response = await axios.post(baseUrl, symptomsList)
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

// POST - 'General' search result from symptoms lists
const getGeneralDiagnosis = async(symptomsList) => {
    try {
        const response = await axios.post(baseUrl, symptomsList)
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export default { getSpecificDiagnosis, getGeneralDiagnosis }