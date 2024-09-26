import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const getYoutubeVideoApi = async (searchText, currentPage, limit, category, fileType) => {

    try {

        const data = {

            params: {

                searchText,
                currentPage,
                limit,
                category,
                fileType
            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/get-youtube-video`, data);
        return response.data;

    } catch (error) {

        console.error('Error while get youtube video', error);
    }
};

export const createYoutubeVideo = async (data) => {

    try {
        
        return await axios.post(`${myServerUrl.url}/create-youtube-video`, data)

    } catch (error) {

        console.log('Error While Calling create youtube video', error)

    }
}


export const updateYoutubeVideo = async (id, formData) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-youtube-video/${id}`, formData);
        return response.data; // Return the data from the response

    } catch (error) {

        console.error('Error while update youtube video', error);
        
    }
};


export const deleteYoutubeVideo = async (id) => {

    try {

        return await axios.delete(`${myServerUrl.url}/delete-youtube-video/${id}`);

    } catch (error) {

        console.log('error while calling delete youtube video', error)

    }
}


