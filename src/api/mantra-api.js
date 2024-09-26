import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const getMantraCategory = async (currentPage, limit) => {

    try {

        const data = {

            params: {

                currentPage,
                limit,

            }
        };

        const response = await axios.get(`${myServerUrl.url}/get-all-mantra-category`, data);
        return response;

    } catch (error) {

        console.log('Error while calling get mantra category', error);
       
    }
};


export const createMantraCategory = async (data) => {

    try {
        
        return await axios.post(`${myServerUrl.url}/create-mantra-category`, data)

    } catch (error) {

        console.log('Error While Calling create mantra category', error)

    }
}


export const updateMantraCategory = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-mantra-category/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {
        console.error('Error while updating mantra category', error);
        throw error; // Rethrow the error for the caller to handle
    }
};


export const deleteMantraCategory = async (id) => {

    try {

        return await axios.delete(`${myServerUrl.url}/delete-mantra-category/${id}`);

    } catch (error) {

        console.log('error while calling delete mantra category', error)

    }
}


//puja mantra


export const getPoojaMantraApi = async (searchText, currentPage, limit, category, exercise) => {

    // const userId = await getUserDetails();

    try {

        const data = {

            params: {
                
                searchText,
                currentPage,
                limit,
                category,
                exercise,
                // userId
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/get-pooja-mantra`, data);
        return response.data;

    } catch (error) {

        console.error('Error while get pooja mantra:', error);
    }
};


export const createMantra = async (data) => {

    try {
        
        return await axios.post(`${myServerUrl.url}/create-pooja-mantra`, data)

    } catch (error) {

        console.log('Error While Calling create mantra', error)

    }
}


export const updateMantra = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-pooja-mantra/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {

        console.error('Error while update mantra', error);
        
    }
};


export const deleteMantra = async (id) => {

    try {

        return await axios.delete(`${myServerUrl.url}/delete-pooja-mantra/${id}`);

    } catch (error) {

        console.log('error while calling delete mantra', error)

    }
}