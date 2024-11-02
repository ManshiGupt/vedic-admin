import React, { useState, useEffect } from 'react'

import { getPoojaByPanditId } from '../api/PanditbyPooja';
import { Collapse, Input, Button } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

const PanditByPooojaId = ({drawerData}) => {
const[data, setData]= useState([]);

const fetchData =async()=>{

    try {
        const response =await getPoojaByPanditId("", "" ,1, 10, drawerData)
      
        setData(response)
        console.log("response hu", response)
    } catch (error) {
        console.log("error while fetching", error)
    }

}


useEffect(() => {
    fetchData()

  
}, [])

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
                  <span>Pandit that can perform this pooja </span>
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
        {data.map((item, index)=>(
              <Panel header={item.name || "New Blog"} key={item.name}>
            <div>

                {/* {item.name} */}
                {item.visibility}
                <Input
              placeholder="name"
              value={item.name}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, name: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
            <Input
              placeholder="visibility"
              value={item.visibility}
              onChange={(e) =>
                setData(
                  data.map((f, i) =>
                    i === index ? { ...f, visibility: e.target.value } : f
                  )
                )
              }
              // readOnly={isReadOnly}
            />
            </div>
            </Panel>
        ))}
        </Collapse>
        </Panel>
        </Collapse>
   
  )
}

export default PanditByPooojaId