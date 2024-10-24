import React from 'react'
import { Drawer, Input, Spin, message } from "antd";
const { TextArea } = Input;


const PoojaFaq = ({faq, pdf, blog, action, setFaq, isReadOnly}) => {
  return (
    <div>
        {faq.map((item, index, arr) => (
            <div key={item.title} className="space-y-2">
             {console.log("td",item)}
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  setFaq(
                    faq.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />

              <TextArea
                placeholder="Description"
                value={item.descriptions}
                onChange={(e) =>
                  setFaq(
                    faq.map((f, i) =>
                      i === index ? { ...f, descriptions: e.target.value } : f
                    )
                  )
                }
              />
              <div>
              {arr.length >0  && (
                <button
                  className="justify-end text-white border-solid border-2 rounded-lg p-2 my-2 w-24 bg-slate-500"
                  onClick={() => action(item.title)}
                >
                  Delete
                </button>
              )}
              </div>
            </div>
          ))}
    </div>
  )
}

export default PoojaFaq


