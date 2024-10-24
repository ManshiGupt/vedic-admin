import React from 'react'
import { Drawer, Input, Spin, message } from "antd";
const { TextArea } = Input;

const PoojaBlog = ({ poojaBlog, action, setBlog, isReadOnly}) => {
  return (
    <div>
        {poojaBlog.map((item, index, arr) => (
            <div key={item.title} className="space-y-2">
             {console.log("td",item)}
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                    setBlog(
                        poojaBlog.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />

              <TextArea
                placeholder="pageUrl"
                value={item.pageUrl}
                onChange={(e) =>
                    setBlog(
                        poojaBlog.map((f, i) =>
                      i === index ? { ...f, pageUrl: e.target.value } : f
                    )
                  )
                }
              />

<Input
                placeholder="thumbnail"
                value={item.thumbnail}
                onChange={(e) =>
                    setBlog(
                        poojaBlog.map((f, i) =>
                      i === index ? { ...f, thumbnail: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
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

export default PoojaBlog