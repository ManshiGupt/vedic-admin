// import React from 'react'
// import { useState } from 'react';

// const PoojaModalAdd = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const handleFaqSubmit = async () => {
//     const newFaq = { title: faqTitle, descriptions: faqDescription, index: faqIndex };
//     setFaq([...faq, newFaq]); 
//     // resetDrawer(); 
//     setIsModalOpen(false);
//     // showModal();
//     // onCancel
    

//   };
//   return (
//     <div>
//            <Modal
//           title="Add New FAQ"
//           open={isModalOpen}
//           onOk={handleFaqSubmit}
//           onCancel={() => setIsModalOpen(false)}
//         >
          
//           <Input
//             placeholder="Title"
//             value={faqTitle}
//             onChange={(e) => setFaqTitle(e.target.value)}
//             className="my-2"
//           />
//           <Input
//             placeholder="Index"
//             value={faqIndex}
//             onChange={(e) => setFaqIndex(Number(e.target.value))}
//             className="my-2"
//           />
//           <TextArea
//             placeholder="Description"
//             value={faqDescription}
//             onChange={(e) => setFaqDescription(e.target.value)}
//             className="my-2"
//           />
//         </Modal>
//     </div>
//   )
// }

// export default PoojaModalAdd