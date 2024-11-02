import axios from "axios";
import { myServerUrl } from "../support/api-helper";

export const getPoojaByPanditId = async(searchText, category, currentPage = 1, limit = 10, poojaId)=>{

    try {
        const data={
            params:{
                searchText, category, currentPage, limit 
            }
        }
        const response = await axios.get(`${myServerUrl.url}/get-pandit-by-pooja/${poojaId}`, data)
        console.log("response loi", response.data.data)

        return response.data.data

    } catch (error) {

        console.log("Error while fetching data", error)
    }
}