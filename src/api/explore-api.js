import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const getAllTVSeries = async (currentPage, limit) => {

    try {

        const data = {

            params: {
                
                currentPage,
                limit,
               
               
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/get-all-tv-series`, data);
        return response.data;


    } catch (error) {

        console.log('Error while calling get tv series', error)

    }
}


export const createTVSeries = async (data) => {
    

    try {
        
        return await axios.post(`${myServerUrl.url}/create-tv-series`, data)

    } catch (error) {

        console.log('Error While Calling create tv series', error)

    }
}


export const updateTVSeries = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-tv-series/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {

        console.error('Error while update tv series', error);
        
    }
};


export const deleteTVSeries = async (id) => {

    try {

        return await axios.delete(`${myServerUrl.url}/delete-tv-series/${id}`);

    } catch (error) {

        console.log('error while calling delete tv series', error)

    }
}