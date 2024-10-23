import axios from "axios";
import { myServerUrl } from '../support/api-helper'

export const getAllPuja= async(searchText, category ,page=1, limit)=>{

    try {

        const data= {

            params:{
                searchText,
                 category,
                 currentPage: page,
                   limit
            }

        }
        const response = await axios.get(`${myServerUrl.url}/get-all-poojas`,data);
      
        return response
        
    } catch (error) {
        console.log("Error while getting puja", error)
    }
}

export const updatePooja = async (id, data) => {

    try {
        const response = await axios.put(`${myServerUrl.url}/update-pooja/${id}`, data);
        return response.data; // Return the data from the response

    } catch (error) {

        console.error('Error while update mantra', error);
        
    }
};

export const createPooja = async (data) => {

    try {
        
        return await axios.post(`${myServerUrl.url}/create-pooja`, data)

    } catch (error) {

        console.log('Error While Calling create faq-help api', error)

    }
}