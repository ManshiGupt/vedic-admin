import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const userRegistration = async (formData) => {
    try {
        // Make a POST request to the server for user registration
        const response = await axios.post(`${myServerUrl.url}/registration`, formData);

        // Extract the token from the response
        const token = response.data.token;

        // Store the token in local storage or session storage
        localStorage.setItem('token', token); // Example: using local storage

        // Optionally, you can return the token or any other relevant data from the API call
        return token; // Returning the token for further processing if needed

    } catch (error) {
        // Handle error
        console.error('Error while calling userRegistration', error);
        throw error; // Rethrow the error to handle it in the caller if needed
    }
}


export const userLogin = async (formData) => {
    try {
        // Make a POST request to the server for user login
        const response = await axios.post(`${myServerUrl.url}/login`, formData);

        // Extract the token from the response
        const token = response.data.token;

        // Remove any previously stored token
        localStorage.removeItem('token');

        // Store the new token in local storage or session storage
        localStorage.setItem('token', token); // Example: using local storage

        // Optionally, you can return the token or any other relevant data from the API call
        return token; // Returning the token for further processing if needed

    } catch (error) {
        // Handle error
        console.error('Error while calling userLogin', error);
        throw error; // Rethrow the error to handle it in the caller if needed
    }
}