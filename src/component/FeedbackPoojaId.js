import React from 'react'
import { useState,useEffect } from 'react';
// import getAllFeedbackReviews from '../api/feedbackReviewApii'
import { getAllfeedback } from '../api/FeedbackReview';
import { Collapse, Input, Button } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

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

<Collapse accordion>

<Panel
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Feedback Review </span>
                  {/* {action !== "View" && (
                    <Button
                      type="primary"
                      className="bg-white text-gray-700 hover:bg-gray-500 "
                      onClick={showBlogModal}
                    >
                      Add new
                    </Button>
                  )} */}
                </div>
              }
            >
           <Collapse accordion> 
      {data.map((item, index) => (
        <Panel header={item.message || "New Blog"} key={item.userName}>
          <div className="space-y-2">
            {console.log("td", item)}



            <TextArea
              placeholder="message"
              value={item.message}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, message: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="stars"
              value={item.stars}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, stars: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="userName"
              value={item.userName}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, userName: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="profileImage"
              value={item.profileImage}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, profileImage: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="poojaId"
              value={item.poojaId}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, poojaId: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="panditId"
              value={item.panditId}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, panditId: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <Input
              placeholder="userId"
              value={item.userId}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, userId: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
             <TextArea
              placeholder="reviewImages"
              value={item.reviewImages}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, reviewImages: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />

             <Input
              placeholder="status"
              value={item.status}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, status: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />

            
            

            <div className="text-right mt-2">
              <Button 
                type="primary" 
                danger 
                // onClick={() => action(item.title)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Panel>
      ))}
      </Collapse>  
        </Panel>
    </Collapse>
  )
}

export default FeedbackPoojaId