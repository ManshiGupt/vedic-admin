import React, { useEffect, useState } from "react";
import { Drawer, Input, Spin, message } from "antd";
import MyButton from "../ui/button.js";
import { updatePooja } from "../api/puja-api.js";
import { createPooja } from "../api/puja-api.js";
import { Button, Modal } from "antd";

import PoojaModalAdd from "./PoojaModalAdd.js";
import PoojaCategoryToggle from "./PoojaCategoryToggle.js";
import PoojaFaq from "./PoojaFaq.js";
const { TextArea } = Input;

const PujaDrawer = ({
  openDrawer,
  closeDrawer,
  refreshTable,
  drawerData,
  action,
}) => {
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // State Variables
  const [images, setImages] = useState("");
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [poojaTag, setPoojaTag] = useState("");
  const [poojaDuration, setPoojaDuration] = useState(0);
  const [tithi, setTithi] = useState("");
  const [aboutPooja, setAboutPooja] = useState("");

  const [category, setCategory] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [index, setIndex] = useState(0);
  const [panditNo, setPanditNo] = useState(0);

  const [faq, setFaq] = useState([]);
  const [poojaBookPdf, setPoojaBookPdf] = useState([]);
  const [poojaBlog, setPoojaBlog] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [faqTitle, setFaqTitle] = useState();
  const [faqDescription, setFaqDescription] = useState("");
  const [faqIndex, setFaqIndex] = useState(0);
  const [pdfTitle, setPdfTitle] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfIndex, setPdfIndex] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogThumbnail, setBlogThumbnail] = useState("");
  const [blogIndex, setBlogIndex] = useState("");
  const [isModalPdfOpen, setIsModalPdfOpen] = useState(false);
  const [isModalBlogOpen, setIsModalBlogOpen] = useState(false);
  //  const[showPdfModal, setshowPdfModal]

  useEffect(() => {
    if (drawerData) {
      // Set data in form when the drawer opens for edit or view
      setTitle(drawerData.title || "");
      setImages(drawerData.images || "");
      setSubtitle(drawerData.subtitle || "");
      setDate(drawerData.date || "");
      setPoojaTag(drawerData.poojaTag || "");
      setTithi(drawerData.tithi || "");
      setAboutPooja(drawerData.aboutPooja || "");
      setPoojaDuration(drawerData.poojaDuration || 0);
      setCategory(drawerData.category || []);
      setVisibility(drawerData.visibility || false);
      setIndex(drawerData.index || 0);
      setPanditNo(drawerData.panditNo || 0);

      setFaq(drawerData.faq || []);
      setPoojaBookPdf(drawerData.poojaBookPdf || []);
      setPoojaBlog(drawerData.poojaBlog || []);

      setIsUpdating(action === "Edit");

      
    }
  }, [drawerData]);

  const validateForm = () => {
    if (!title.trim()) return "Title is required.";
    if (!subtitle.trim()) return "Subtitle is required.";

    if (!poojaTag.trim()) return "Pooja tag is required.";
    if (poojaDuration <= 0) return "Pooja duration must be greater than 0.";
    if (!aboutPooja.trim()) return "About Pooja is required.";
    return null;
  };

  const formData = {
    images,
    title,
    subtitle,
    date,
    poojaTag,
    poojaDuration,
    tithi,
    aboutPooja,
    category,
    visibility,
    index,
    panditNo,
    faq,
    poojaBookPdf,
    poojaBlog,
  };

  const resetDrawer = () => {
    closeDrawer();
    setIsUpdating(false);
    setTitle("");
    setSubtitle("");
    setImages("");
    setDate("");
    setPoojaTag("");
    setPoojaDuration(0);
    setTithi("");
    setAboutPooja("");
    setCategory([]);
    setVisibility(false);
    setIndex(0);
    setPanditNo(0);
    setFaq([]);
    setPoojaBookPdf([]);
    setPoojaBlog([]);
    setFaqTitle("");
    setFaqDescription("");
    setFaqIndex(0);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showPdfModal = () => {
    setIsModalPdfOpen(true);
  };

  const showBlogModal = () => {
    setIsModalBlogOpen(true);
  };

  const handleSubmit = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      message.error(errorMessage);
      return;
    }

    setLoading(true);
    setIsModalOpen(false);
    try {
      if (isUpdating) {
        await updatePooja(drawerData._id, formData);
        console.log(formData);
        message.success("Pooja updated successfully!");
      } else {
        await createPooja(formData);
        message.success("Pooja created successfully!");
      }

      // resetDrawer();
      setTimeout(() => {
        // Display success alert and close the drawer if title and description are not empty
        setLoading(false);
        alert("Data Updated Successfully...!");

        resetDrawer();

        //after successful refresh the table
        refreshTable();

        //close drawer
        closeDrawer();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFaqSubmit = async () => {
    const newFaq = {
      title: faqTitle,
      descriptions: faqDescription,
      index: faqIndex,
    };

    setFaq([...faq, newFaq]);

    // resetDrawer();
    setIsModalOpen(false);
    // showModal();
    // onCancel
  };
  const handlePdfSubmit = async () => {
    const newPoojaBookPdf = {
      title: pdfTitle,
      pdfUrl: pdfUrl
    };
    setPoojaBookPdf([...poojaBookPdf, newPoojaBookPdf]);
    // resetDrawer();
    setIsModalPdfOpen(false);
    // showModal();
    // onCancel
  };

  const handleBlogSubmit = async () => {
    const newPoojaBookBlog = {
      title: blogTitle,
      pageUrl: blogUrl,
      thumbnail: blogThumbnail,
      
    };
    setPoojaBlog([...poojaBlog, newPoojaBookBlog]);
    // resetDrawer();
    setIsModalBlogOpen(false);
    // showModal();
    // onCancel
  };

  const handleDeleteFaq = async (title) => {
    // alert(index.title);
    const f = faq.filter((data) => data.title !== title);
    setFaq(f);
    // console.log("ka", setFaq(f));
  };
  // const handleDeletePdf = async (deletePooja) => {
  //   const f = poojaBookPdf.filter((data) => data !== deletePooja);
  //   setPoojaBookPdf(f);
  // };
  const handleDeletePdf = async (title) => {
    const f = poojaBookPdf.filter((data) => data.title !== title);
    setPoojaBookPdf(f);
  };
  const handleDeleteBlog = async (deletePooja, poojaBlog) => {
    const f = poojaBlog.filter((data) => data !== deletePooja);
    setPoojaBlog(f);
  };

  const isReadOnly = action === "View";

  return (
    <Drawer
      title={
        isUpdating
          ? "Update Pooja"
          : action === "View"
          ? "View Pooja"
          : "Add New Pooja"
      }
      onClose={resetDrawer}
      open={openDrawer}
      maskClosable={false}
      width={800}
      className="space-y-4"
    >
      <Spin spinning={loading}>
        <div>
          {/*        
        <PoojaModalAdd/> */}
        <div className="flex">
          
          <p className="py-4">Title</p>
          </div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Images</p>
          <Input
            value={images}
            onChange={(e) => setImages(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        {images != "" && 
        <div className="h-auto w-{100%} object-fill py-4">
          <img src={images} alt="image preview" className=""/>
          
        </div> }

        <div>
          <p className="py-4">Subtitle</p>
          <Input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Date</p>
          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>
        <div>
          <p className="py-4">visibility</p>
          <Input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>
        <div>
          <p className="py-4">panditNo</p>
          <Input
            value={panditNo}
            onChange={(e) => setPanditNo(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>
        <div>
          <p className="py-4">category</p>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            readOnly={isReadOnly}
          />
          <h1><PoojaCategoryToggle/></h1>
        </div>


        <div>
          <p className="py-4">Pooja Tag</p>
          <Input
            value={poojaTag}
            onChange={(e) => setPoojaTag(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">Pooja Duration (in hours)</p>
          <Input
            type="number"
            value={poojaDuration}
            onChange={(e) => setPoojaDuration(Number(e.target.value))}
            readOnly={isReadOnly}
          />
        </div>

        <div>
          <p className="py-4">About Pooja</p>
          <TextArea
            rows={4}
            value={aboutPooja}
            onChange={(e) => setAboutPooja(e.target.value)}
            readOnly={isReadOnly}
          />
        </div>

        <div>

          {/* Faq pooja section */}
         <PoojaFaq faq={faq} pdf ={poojaBookPdf} blog={poojaBlog} action={handleDeleteFaq} setFaq={setFaq} isReadOnly={isReadOnly}/>

          {/* <PoojaFaq/> */}
          <div className="bg-gray-500 my-2 text-white py-4 px-2 ">
            <div className="flex justify-between ">
              <div>
               
                <p>FAQ</p>
              </div>

              <div>
                {action !== "View" && (
                  <Button
                    type="primary"
                    className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg"
                    onClick={showModal}
                  >
                    Add new
                  </Button>
                )}
              </div>
            </div>
            <Modal
              title="Add New FAQ"
              open={isModalOpen}
              onOk={handleFaqSubmit}
              onCancel={() => setIsModalOpen(false)}
            >
              <Input
                placeholder="Title"
                value={faqTitle}
                onChange={(e) => setFaqTitle(e.target.value)}
                className="my-2"
              />

              <TextArea
                placeholder="Description"
                value={faqDescription}
                onChange={(e) => setFaqDescription(e.target.value)}
                className="my-2"
              />
            </Modal>
          </div>

          

          {faq.map((item, index, arr) => (
            <div key={title} className="space-y-2">
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
                  onClick={() => handleDeleteFaq(item.title)}
                >
                  Delete
                </button>
              )}
              </div>
            </div>
          ))}

          <div>


            {/* Pooja Book PDF */}
            <div className="bg-gray-500 my-2 text-white py-4 flex justify-between px-2">
              <p>Pooja Book Pdf</p>
              {action !== "View" && (
                <Button
                  type="primary"
                  className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg"
                  onClick={showPdfModal}
                >
                  Add new
                </Button>
              )}

              <Modal
                title="Add New Pooja Book Pdf"
                open={isModalPdfOpen}
                onOk={handlePdfSubmit}
                onCancel={() => setIsModalPdfOpen(false)}
              >
                <Input
                  placeholder="Title"
                  value={pdfTitle}
                  onChange={(e) => setPdfTitle(e.target.value)}
                  className="my-2"
                />
                <Input
                  placeholder="Url"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  className="my-2"
                />
                {/* <TextArea
                  placeholder="Index"
                  value={pdfIndex}
                  onChange={(e) => setPdfIndex(e.target.value)}
                  className="my-2"
                /> */}
              </Modal>
            </div>
            {poojaBookPdf.map((item, index, arr) => (
              <div key={title}>
                {/* <Input
                  placeholder="index"
                  value={item.index}
                  onChange={(e) =>
                    setPoojaBookPdf(
                      poojaBookPdf.map((f, i) =>
                        i === index ? { ...f, index: e.target.value } : f
                      )
                    )
                  }
                  readOnly={isReadOnly}
                /> */}
                <Input
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    setPoojaBookPdf(
                      poojaBookPdf.map((f, i) =>
                        i === index ? { ...f, title: e.target.value } : f
                      )
                    )
                  }
                  readOnly={isReadOnly}
                />

                <TextArea
                  placeholder="PdfUrl"
                  value={item.pdfUrl}
                  onChange={(e) =>
                    setPoojaBookPdf(
                      poojaBookPdf.map((f, i) =>
                        i === index ? { ...f, pdfUrl: e.target.value } : f
                      )
                    )
                  }
                />
                
                {
                  ( arr.length >0 && (
                    <button
                      className="justify-end text-white border-solid border-2 rounded-lg p-2 mb-5 mt-2 w-24 bg-slate-500"
                      onClick={() => handleDeletePdf(item.title)}
                    >
                      Delete
                    </button>
                  ))
                }
              </div>
            ))}
          </div>

          <div className="bg-gray-500 my-2 text-white py-4 flex justify-between px-2">
            <p>Pooja Blog</p>
            {action !== "View" && (
              <Button
                type="primary"
                className="bg-white text-gray-700 hover:bg-gray-500 shadow-lg"
                onClick={showBlogModal}
              >
                Add new
              </Button>
            )}
            <Modal
              title="Add New Pooja Blog"
              open={isModalBlogOpen}
              onOk={handleBlogSubmit}
              onCancel={() => setIsModalBlogOpen(false)}
            >
              {/* <Input
                placeholder="Index"
                value={blogIndex}
                onChange={(e) => setBlogIndex(Number(e.target.value))}
                className="my-2"
              /> */}
              <Input
                placeholder="Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="my-2"
              />

              <Input
                placeholder="Thumbnail"
                value={blogThumbnail}
                onChange={(e) => setBlogThumbnail(e.target.value)}
                className="my-2"
              />
              <TextArea
                placeholder="Url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                className="my-2"
              />
            </Modal>
          </div>
          {poojaBlog.map((item, index, arr) => (
            <div key={title}>
              {console.log("Pooja Blog", item)}
              {/* <Input
                placeholder="index"
                value={item.index}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, index: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              /> */}
              <Input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, title: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
              <TextArea
                placeholder="PageUrl"
                value={item.pageUrl}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, pageUrl: e.target.value } : f
                    )
                  )
                }
              />
              <Input
                placeholder="Thumbnail"
                value={item.thumbnail}
                onChange={(e) =>
                  setPoojaBlog(
                    poojaBlog.map((f, i) =>
                      i === index ? { ...f, thumbnail: e.target.value } : f
                    )
                  )
                }
                readOnly={isReadOnly}
              />
              {
                (arr.length >0 && (
                  <button
                    className="justify-end text-white border-solid border-2 rounded-lg p-2 mb-5 mt-2 w-24 bg-slate-500"
                    onClick={() => handleDeleteBlog(item, poojaBlog)}
                  >
                    Delete
                  </button>
                ))
              }
            </div>
          ))}
        </div>

        {action !== "View" && (
          <div style={{ marginTop: "30px" }}>
            <MyButton
              title={isUpdating ? "Update" : "Submit"}
              action={handleSubmit}
            />
          </div>
        )}
      </Spin>
    </Drawer>
  );
};

export default PujaDrawer;
