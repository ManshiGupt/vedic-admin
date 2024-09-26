import axios from 'axios'
import { myServerUrl } from '../support/api-helper'

export const getSupportQuery = async (currentPage, limit) => {

    try {

        const data = {

            params: {

                currentPage,
                limit,

            }
        };

        const response = await axios.get(`${myServerUrl.url}/get-support-query`, data);
        return response;

    } catch (error) {

        console.log('Error while calling get support query', error);
       
    }
};