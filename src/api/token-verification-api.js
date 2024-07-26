import axios from "axios";
import { myServerUrl } from '../support/api-helper';

export const tokenVerificationApi = async () => {
    try {
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
            // Handle case where token is missing
            console.log('Token missing');
            // Redirect to login page
            window.location.href = '/login'; // Change '/login' to the actual URL of your login page
            return;
        }

        // Set authorization header with the token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        // Make the API request with the token
        const response = await axios.post(`${myServerUrl.url}/validate-token`, null, config); // Send null as request body
        return response.data;
        
    } catch (error) {
        console.log('error while calling token verification API', error);
       
    }
};
