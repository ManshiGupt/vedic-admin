import axios from "axios";
import { myServerUrl } from "../support/api-helper";


export const getAllfeedback =async(poojaId, samagriId, panditId, userId, currentPage = 1, limit = 10)=>{

    try {
        const data ={
            params:{
                poojaId, samagriId, panditId, userId, currentPage , limit 
            }

        }

        const response= await axios.get(`${myServerUrl.url}/get-feedback-review`,data);
        console.log("res for review", response)
        return response.data.data
        
    } catch (error) {
        console.log("Error while fetching api of feedback Review", error)
    }


}