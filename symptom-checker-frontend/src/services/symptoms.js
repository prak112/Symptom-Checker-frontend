import axios from 'axios'

const baseUrl = '/api/protected/symptoms'

// POST - 'General' search result from symptoms lists
const getGeneralDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(`${baseUrl}/general`, symptoms)
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// POST - 'Specific' search result from symptoms lists
const getSpecificDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(`${baseUrl}/specific`, symptoms)
        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export default { getSpecificDiagnosis, getGeneralDiagnosis }