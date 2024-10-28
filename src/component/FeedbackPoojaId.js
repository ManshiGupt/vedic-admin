import React from 'react'
import { useState,useEffect } from 'react';
// import getAllFeedbackReviews from '../api/feedbackReviewApii'
import { getAllfeedback } from '../api/FeedbackReview';

const FeedbackPoojaId = ( {drawerData} ) => {
const[data, setData]= useState([]);
const fetchData =async()=>{
    try {

        const response = await getAllfeedback(drawerData,"","","",1,10)
        setData(response)
        console.log("response"+ response)
    } catch (error) {
        console.log("while fetching")
    }

}

useEffect(() => {
  
    fetchData();
  
}, [])

{console.log("DDD "+drawerData)}
    
  return (



    <div>

       {data.map((ram)=>(
        <div>
<h1>{ram.message}</h1>
        </div>
       ))}
    </div>
  )
}

export default FeedbackPoojaId