import axios from "axios";
import { myServerUrl } from "../support/api-helper";

export const getPoojaByPanditId= (searchText, category, currentPage = 1, limit = 10)=>{

    try {
        const data={
            params:{
                searchText, category, currentPage, limit 
            }
        }
        const response = axios.get(`${myServerUrl.url}/get-pandit-by-pooja/:poojaId`, data)
        console.log("response", response.data.data)

    } catch (error) {

        console.log("Error while fetching data", error)
    }
}