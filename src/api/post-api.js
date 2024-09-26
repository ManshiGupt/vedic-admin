import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const getAllPost = async (searchText, currentPage, limit) => {

    try {

        const data = {

            params: {

                searchText,
                currentPage,
                limit,

            }
        };

        // Make the API request with the token
        const response = await axios.get(`${myServerUrl.url}/get-all-post2`, data);
        return response;


    } catch (error) {

        console.log('Error while calling get post data', error)

    }
}


export const updatePost = async (id, formData) => {

    try {

      
        const response = await axios.put(`${myServerUrl.url}/update-post/${id}`, formData);
        return response;

    } catch (error) {

        console.log('Error while calling update post', error);

    }
};
