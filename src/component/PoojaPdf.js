import React from 'react'
import { Drawer, Input, Spin, message } from "antd";
const { TextArea } = Input;

const PoojaPdf = ({ pdf, action, setPdf, isReadOnly}) => {
  return (
    <div>
        {pdf.map((item, index, arr) => (
            <div key={item.title} className="space-y-2">
             {console.log("td",item)}
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                    setPdf(
                    pdf.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />

              <TextArea
                placeholder="pdfUrl"
                value={item.pdfUrl}
                onChange={(e) =>
                    setPdf(
                    pdf.map((f, i) =>
                      i === index ? { ...f, pdfUrl: e.target.value } : f
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

export default PoojaPdf