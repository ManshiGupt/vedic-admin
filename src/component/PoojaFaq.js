import React from "react";
import { Collapse, Input, Button } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

const PoojaFaq = ({ faq, action, setFaq, isReadOnly }) => {
  return (
    <Collapse accordion>
      {faq.map((item, index) => (
        <Panel header={item.title || "New FAQ"} key={item.title}>
          <div className="space-y-2">
            {console.log("td", item)}
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

export default PoojaFaq;
