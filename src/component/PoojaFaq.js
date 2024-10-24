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



// PoojaFaq.js
// import React from "react";
// import { Input, Button } from "antd";

// const { TextArea } = Input;

// const PoojaFaq = ({ faqList, handleFaqSubmit, handleDeleteFaq }) => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">FAQ Section</h2>
//       {faqList.map((faq, index) => (
//         <div key={index} className="mb-4 space-y-2">
//             {console.log("koa", faq)}
//           <Input
//             placeholder="Title"
//             value={faq.title}
//             onChange={(e) => handleFaqSubmit(index, "title", e.target.value)}
//           />
//           <TextArea
//             rows={2}
//             placeholder="Description"
//             value={faq.descriptions}
//             onChange={(e) =>
//                 handleFaqSubmit(index, "description", e.target.value)
//             }
//           />
//           <Button
//             className="bg-red-500 text-white mt-2"
//             onClick={() => handleDeleteFaq(faq.title)}
//           >
//             Delete
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PoojaFaq;
{/* <PoojaFaq
faqList={faq}
onFaqChange={handleFaqSubmit}
onDeleteFaq={ handleDeleteFaq}
/> */}