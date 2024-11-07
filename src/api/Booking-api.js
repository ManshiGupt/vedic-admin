import axios from 'axios'
import React from 'react'
import { myServerUrl } from '../support/api-helper'

export const getAllPoojaBooking = async( userId, category, currentPage = 3, limit = 10  ) => {
   
  try {
    const data= {
        params:
       { userId, category, currentPage, limit}
    }
    const res = await axios.get(`${myServerUrl.url}/get-pooja-booking`, data)
    console.log("book api", res)
    return res
   
    
  } catch (error) {
    console.log("Error while fetching data in booking api")
  }
}

 