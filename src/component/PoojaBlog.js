import React from "react";
import { Collapse, Input, Button } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

const PoojaBlog = ({ poojaBlog, action, setBlog, isReadOnly }) => {
  return (
    <Collapse accordion>
      {poojaBlog.map((item, index) => (
        <Panel header={item.title || "New Blog"} key={item.title}>
          <div className="space-y-2">
            {console.log("td", item)}

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
              placeholder="Page URL"
              value={item.pageUrl}
              onChange={(e) =>
                setBlog(
                  poojaBlog.map((f, i) =>
                    i === index ? { ...f, pageUrl: e.target.value } : f
                  )
                )
              }
              readOnly={isReadOnly}
            />

            <Input
              placeholder="Thumbnail"
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

            <div className="text-right mt-2">
              <Button 
                type="primary" 
                danger 
                onClick={() => action(item.title)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
};

export default PoojaBlog;