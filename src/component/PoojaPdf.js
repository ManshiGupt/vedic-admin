import React from "react";
import { Collapse, Input } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

const PoojaPdf = ({ pdf, action, setPdf, isReadOnly }) => {
  return (
    <Collapse accordion>
      {pdf.map((item, index) => (
        <Panel header={item.title || "New PDF"} key={item.title}>
          <div className="space-y-2">
            {console.log("td", item)}

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
              placeholder="PDF URL"
              value={item.pdfUrl}
              onChange={(e) =>
                setPdf(
                  pdf.map((f, i) =>
                    i === index ? { ...f, pdfUrl: e.target.value } : f
                  )
                )
              }
              readOnly={isReadOnly}
            />

            <div className="text-right mt-2">
              <button 
                
                 
                onClick={() => action(item.title)}
                className="border-0 text-red-600 underline underline-offset-4 border-white hover:bg-red-200 px-3 rounded-lg py-2 m-0 "
              >
                Delete
              </button>
            
            </div>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export default PoojaPdf;
