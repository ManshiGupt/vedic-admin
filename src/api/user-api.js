import axios from 'axios'
import { myServerUrl } from '../support/api-helper'


export const getAllUser = async (searchText, currentPage, limit) => {

    // const userId = await getUserDetails();

    try {

        const data = {

            params: {
                
                searchText,
                currentPage,
                limit,
                
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/all-users`, data);
        return response;

    } catch (error) {

        console.error('Error while get user data', error);
    }
};


export const updateUserProfile = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-user/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {

        console.error('Error while update mantra', error);
        
    }
};


export const getAllProfileVerificationRequest = async (searchText, currentPage, limit) => {

    // const userId = await getUserDetails();

    try {

        const data = {

            params: {
                
                searchText,
                currentPage,
                limit,
                
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/get-all-profile-verification-request`, data);
        return response;

    } catch (error) {

        console.error('Error while get user data', error);
    }
};
