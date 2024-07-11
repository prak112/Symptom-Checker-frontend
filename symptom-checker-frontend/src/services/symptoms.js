import axios from 'axios'

const baseUrl = '/api/symptoms'

// POST - short list of symptoms
const getQuickDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(baseUrl, symptoms)
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
} 

// POST - long list of symptoms
const getDetailedDiagnosis = async(symptoms) => {
    try {
        const response = await axios.post(baseUrl, symptoms)
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export default { getQuickDiagnosis, getDetailedDiagnosis }