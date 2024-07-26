import axios from 'axios'
import { myServerUrl } from '../support/api-helper'


export const createFaqHelp = async (data) => {

    try {
        
        return await axios.post(`${myServerUrl.url}/faq-help`, data)

    } catch (error) {

        console.log('Error While Calling create faq-help api', error)

    }
}

export const getFaqHelp = async (startDate, endDate, searchText, currentPage, limit) => {
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
            },
            params: {
                startDate,
                endDate,
                searchText,
                currentPage,
                limit
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/all-faq-help`, config);
        return response.data;

    } catch (error) {
        console.error('Error while calling getfaqhelp API:', error);

        if (error.response && error.response.status === 401) {
            
            // Token is invalid, redirect to login page
            window.location.href = '/login'; // Change '/login' to the actual URL of your login page

        } else if (error.response && error.response.status === 500) {
            window.location.href = '/login';

        } else {
            // Handle other errors (e.g., network error, server error)
            console.log('Invalid token', error)
        }
    }
};



export const deleteFaqHelp = async (id) => {

    try {

        return await axios.delete(`${myServerUrl.url}/delete-faq-help/${id}`);

    } catch (error) {

        console.log('error while calling delete faq', error)

    }
}

export const updateFaqHelp = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-faq-help/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {
        console.error('Error while updating FAQ help:', error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const downloadFaqExcelFile = async (startDate, endDate) => {
    try {

        const response = await axios.get(`${myServerUrl.url}/download-faq-help-excle-file`,
            {
                responseType: 'blob',
                params: { startDate, endDate }

            });

        // Create URL for downloading the file
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element and simulate a click to trigger file download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'faqs.xlsx');
        document.body.appendChild(link);
        link.click();

        // Clean up response
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

    } catch (error) {
        console.error('Error downloading Excel file:', error);
    }
};

