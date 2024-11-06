import React, { useEffect, useState } from "react";
import { Drawer, Input, Spin, message, Collapse } from "antd";
import MyButton from "../ui/button.js";
import { updatePooja } from "../api/puja-api.js";
import { createPooja } from "../api/puja-api.js";
import { Button, Modal } from "antd";
import { Select, Tag,Space } from "antd";
import { Switch } from "antd";




import PoojaModalAdd from "./PoojaModalAdd.js";
import PoojaCategoryToggle from "./PoojaCategoryToggle.js";
import PoojaFaq from "./PoojaFaq.js";
import PoojaPdf from "./PoojaPdf.js";
import PoojaBlog from "./PoojaBlog.js";
import FeedbackPoojaId from "./FeedbackPoojaId.js";
import PanditByPooojaId from "./PanditByPooojaId.js";
const { TextArea } = Input;
const { Panel } = Collapse;
const { Option } = Select;
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
  const [showFaq, setShowFaq] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  //  const[showPdfModal, setshowPdfModal]
  const [disabled, setDisabled] = useState(true);
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

  const handlePanelChange = (key) => {
    setActivePanel(key); // Toggle FAQ panel visibility
  };
  // console.log("loo "+ drawerData._id)
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
      pdfUrl: pdfUrl,
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
   
    const f = faq.filter((data) => data.title !== title);
    setFaq(f);
    
  };
  
  const handleDeletePdf = async (title) => {
    const f = poojaBookPdf.filter((data) => data.title !== title);
    setPoojaBookPdf(f);
  };
  const handleDeleteBlog = async (title) => {
    const f = poojaBlog.filter((data) => data.title !== title);
    setPoojaBlog(f);
  };

  const categoryOptions = ["Sanskaar", "Vedic Vidhi", "Festivals", "Havan", "Puja Path"];

  const handleCategoryChange = (values) => {
    setCategory(values);
  };
  const handleToggle = (checked) => {
    setVisibility(checked); 
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
        {/*        
        <PoojaModalAdd/> */}

        <Collapse onChange={handlePanelChange} accordion  className="my-4">
          
          <Panel
            header="Pooja Details"
           
          >
            <div className="flex">
              <p className="py-4 font-semibold antialiased">Title</p>
            </div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={isReadOnly}
            />

            <div>
              <p className="py-4 font-semibold antialiased">Images</p>
              <Input
                value={images}
                onChange={(e) => setImages(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            {images != "" && (
              <div className="h-auto w-{100%} object-fill py-4">
                <img src={images} alt="image preview" className="" />
              </div>
            )}

            <div>
              <p className="py-4 font-semibold antialiased">Subtitle</p>
              <TextArea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Date (optional)</p>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
            <div>
              <p className="py-4 font-semibold antialiased">Visibility</p>
              {/* <Input
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                readOnly={isReadOnly}
              /> */}
               {!isReadOnly ? (
        <Switch
          checked={visibility}
          onChange={handleToggle}
          className="my-2"
        />
      ) : (
        
        <Switch
          checked={visibility}
          disabled={disabled}
          onChange={handleToggle}
          className="my-2"
        />
      )}
            </div>
            <div>
              <p className="py-4 font-semibold antialiased">PanditNo</p>
              <Input
                value={panditNo}
                onChange={(e) => setPanditNo(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
            <div>
              <p className="py-4 font-semibold antialiased">Category</p>
              {/* <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                readOnly={isReadOnly}
              /> */}
              {!isReadOnly ? (
          <Select
          mode="multiple"
          value={category}
          onChange={handleCategoryChange}
          className="w-full"
        >
          {categoryOptions.map((option) => (
            <Option
              key={option}
              value={option}
              disabled={category.includes(option)}
            >
              {/* <Space> */}
                {option}
                {/* Cancel button to remove the selected option */}
                {category.includes(option) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click from affecting the Select
                      handleCategoryChange(category.filter((item) => item !== option));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✖
                  </button>
                )}
              {/* </Space> */}
            </Option>
          ))}
        </Select>
        
      ) : (
        <div className="py-2">
          {category.map((item) => (
            <Tag key={item} className="m-1 px-6 py-2">
              {item}
            </Tag>
          ))}
        </div>
      )}
              {/* <h1>
                <PoojaCategoryToggle />
              </h1> */}
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">Pooja Tag</p>
              <Input
                value={poojaTag}
                onChange={(e) => setPoojaTag(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
            <div>
              <p className="py-4 font-semibold antialiased">Tithi</p>
              <Input
                value={tithi}
                onChange={(e) => setTithi(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
            <div>
              <p className="py-4 font-semibold antialiased">Index</p>
              <Input
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>



            <div>
              <p className="py-4 font-semibold antialiased">Pooja Duration (in hours)</p>
              <Input
                type="number"
                value={poojaDuration}
                onChange={(e) => setPoojaDuration(Number(e.target.value))}
                readOnly={isReadOnly}
              />
            </div>

            <div>
              <p className="py-4 font-semibold antialiased">About Pooja</p>
              <TextArea
                rows={4}
                value={aboutPooja}
                onChange={(e) => setAboutPooja(e.target.value)}
                readOnly={isReadOnly}
              />
            </div>
          </Panel>
          </Collapse>
          <div>
            {/* Faq pooja section */}
            

            

            <div className="faq-section">
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

            {/* Collapsible FAQ list */}
            <Collapse accordion  className="my-4">
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>FAQ </span>
                    {action !== "View" && (
                      <button
                        
                      className="bg-white text-gray-700 hover:bg-gray-100 px-4 rounded-md border-2 border-gray-200 hover:shadow-md hover:text-gray-800"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Add New
                      </button>
                    )}
                  </div>
                }
              >
                <PoojaFaq
                  faq={faq}
                  action={handleDeleteFaq}
                  setFaq={setFaq}
                  isReadOnly={action === "View"}
                />
              </Panel>
            
            </Collapse>

            <div>
              {/* Pooja Book PDF */}
              <div className="">
                

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
                </Modal>
              </div>

              <Collapse accordion  className="my-4">
                <Panel
                  header={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>PDF </span>
                      {action !== "View" && (
                        <button
                         
                          className="bg-white text-gray-700 hover:bg-gray-100 px-4  rounded-md border-2 border-gray-200 hover:shadow-md hover:text-gray-800"
                          onClick={showPdfModal}
                        >
                          Add new
                        </button>
                      )}
                    </div>
                  }
                >
                  <PoojaPdf
                    pdf={poojaBookPdf}
                    action={handleDeletePdf}
                    setPdf={setPoojaBookPdf}
                    isReadOnly
                  />
                </Panel>
                {/* </div> */}
              </Collapse>
            </div>
{/* blog */}
            {/* <div className=" py-4"> */}
             

              <Modal
                title="Add New Pooja Blog"
                open={isModalBlogOpen}
                onOk={handleBlogSubmit}
                onCancel={() => setIsModalBlogOpen(false)}
              >
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
            <Collapse accordion  className="my-4">
            <Panel
              header={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Blog </span>
                  {action !== "View" && (
                    <button
                     
                      className="bg-white text-gray-700 hover:bg-gray-100 px-4  rounded-md border-2 border-gray-200 hover:shadow-md hover:text-gray-800"
                      onClick={showBlogModal}
                    >
                      Add new
                    </button>
                  )}
                </div>
              }
            >
            <PoojaBlog
              poojaBlog={poojaBlog}
              action={handleDeleteBlog}
              setBlog={setPoojaBlog}
              isReadOnly={isReadOnly}
            />
            </Panel>
          
            </Collapse>

{/* { action==="View" && <FeedbackPoojaId  drawerData={drawerData._id}/>} */}

{/* <PanditByPooojaId drawerData={drawerData._id}/> */}
{/* action==="View" */}

{/* {console.log("lo "+ drawerData._id)} */}

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
