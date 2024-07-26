import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MyButton from '../ui/button.js';
// import MyAlertBanner from '../ui/alert';
import { createFaqHelp, updateFaqHelp } from '../api/faq-help-api.js';

function FaqHelpDrawer({ openDrawer, closeDrawer, refreshTable, drawerData }) {


    // const [showBanner, setShowBanner] = useState(false);
    const [title, setTitle] = useState('');
    const [descriptions, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        if (drawerData) {

            setTitle(drawerData.title || '')
            setDescription(drawerData.descriptions || '')
            setIsUpdating(true)

        }else{
            
            setIsUpdating(false)
        }

    }, [drawerData])

    const formData = {

        title,
        descriptions,
    }

    const updateData = async () => {

        //make the update api call
        await updateFaqHelp(drawerData._id, formData)

        setTimeout(() => {

            // Display success alert and close the drawer if title and description are not empty
            setLoading(false)
            alert('Form Updated Successfully...!');

            //after successful refresh the table
            refreshTable()

            //reset form filed
            setTitle('')
            setDescription('')

            //close drawer
            closeDrawer()


        }, 1000);
    }

    const resetDrawer = () => {

        closeDrawer()
        setIsUpdating(false)
        setTitle('')
        setDescription('')

    }

    const buttonClick = async (e) => {

        setLoading(true)

        // Perform validation to check if title and description are not empty
        if (title.trim() === '' || descriptions.trim() === '' || descriptions.trim() === '<p><br></p>') {
            // Display error alert if title or description is empty

            setLoading(false)

            return alert('Please enter title and description.');


        }

        if (isUpdating) {

            updateData()

        } else {

            // Make the API call to create faq-help
            await createFaqHelp(formData);

            setTimeout(() => {

                // Display success alert and close the drawer if title and description are not empty
                setLoading(false)
                console.log(formData);
                alert('Form Submitted Successfully...!');

                //after successful refresh the table
                refreshTable()

                //reset form filed
                setTitle('')
                setDescription('')

                //close drawer
                closeDrawer()


            }, 1000);

        }




    };



    return (
        <div>

            <Drawer title={isUpdating ? "Update Faq or Help Section" : "Add Faq or Help Section"} 
            onClose={resetDrawer} open={openDrawer} maskClosable={false} width={600}>

                <Spin tip="Loading..." size="medium" spinning={loading}>

                    {/* <div>
                    <MyAlertBanner
                        message={"Faq-Help Successfully Created...!"}
                        type={"Success:"}
                        showBanner={showBanner}
                        setShowBanner={setShowBanner}
                        
                    />
                    </div> */}

                    <div>
                        <p style={{ fontSize: '15px' }}>Title</p>
                        <Input
                            placeholder="Enter your question"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Descriptions</p>
                        <ReactQuill
                            placeholder="Enter your question"
                            style={{ height: 'auto' }}
                            value={descriptions}
                            onChange={setDescription}
                        />
                    </div>
                    <div style={{ marginTop: '30px' }}>

                        <MyButton
                            title={isUpdating ? "Update" : "Submit"}
                            textColor="black"
                            padding="10px 25px"
                            borderRadius="10px"
                            fontSize="12px"
                            hoverColor="red"
                            action={buttonClick}
                        />

                    </div>
                </Spin>



            </Drawer>
        </div>
    );
}

export default FaqHelpDrawer;
