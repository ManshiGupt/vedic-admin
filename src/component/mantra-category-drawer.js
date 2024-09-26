import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MyButton from '../ui/button.js';
// import MyAlertBanner from '../ui/alert';
// import { createFaqHelp, updateFaqHelp } from '../api/faq-help-api.js';
import { createMantraCategory, updateMantraCategory } from '../api/mantra-api.js';

function MantraCategoryDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {


    // const [showBanner, setShowBanner] = useState(false);
    const [title, setTitle] = useState('');
    // const [descriptions, setDescription] = useState('');
    const [index, setIndex] = useState(1)
    const [loading, setLoading] = useState(false);


    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        if (drawerData) {

            setTitle(drawerData.title || '')
            // setDescription(drawerData.descriptions || '')
            setIndex(drawerData.index || 0)

            if (action === 'View') {


            } else {

                setIsUpdating(true)

            }


        } else {

            setIsUpdating(false)
        }

    }, [drawerData])

    const formData = {

        title,
        // descriptions,
        index
    }

    const updateData = async () => {

        //make the update api call
        await updateMantraCategory(drawerData._id, formData)

        setTimeout(() => {

            // Display success alert and close the drawer if title and description are not empty
            setLoading(false)
            alert('Data Updated Successfully...!');

            //after successful refresh the table
            refreshTable()

            //reset form filed
            setTitle('')
            // setDescription('')
            setIndex(0)

            //close drawer
            closeDrawer()


        }, 1000);
    }

    const resetDrawer = () => {

        closeDrawer()
        setIsUpdating(false)
        setTitle('')
        // setDescription('')
        setIndex(0)

    }

    const buttonClick = async (e) => {

        setLoading(true)

        // Perform validation to check if title and description are not empty
        if (title.trim() === '') {
            // Display error alert if title or description is empty

            setLoading(false)

            return alert('Please enter title and index.');


        }

        if (isUpdating) {

            updateData()

        } else {

            // Make the API call to create faq-help
            await createMantraCategory(formData);

            setTimeout(() => {

                // Display success alert and close the drawer if title and description are not empty
                setLoading(false)
                // console.log(formData);
                alert('Data Submitted Successfully...!');

                //after successful refresh the table
                refreshTable()

                //reset form filed
                setTitle('')
                // setDescription('')
                setIndex(0)

                //close drawer
                closeDrawer()


            }, 1000);

        }




    };



    return (
        <div>

            <Drawer title={isUpdating ? "Update Mantra Category" : "Add Mantra Category"}
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
                        <p style={{ fontSize: '15px' }}>Document Id</p>
                        <Input
                            // placeholder="Enter mantra title"
                            value={drawerData ? drawerData._id : 'null'}
                            // onChange={(e) => setTitle(e.target.value)}
                            readOnly
                            style={{ color: 'gray' }}
                        />
                    </div>

                    <div>
                        <p style={{ fontSize: '15px' }}>Title</p>
                        <Input
                            placeholder="Enter mantra title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly={action === 'View'}
                        />
                    </div>

                    <div>
                        <p style={{ fontSize: '15px' }}>Index</p>
                        <Input
                            placeholder="Enter index no"
                            value={index}
                            onChange={(e) => setIndex(e.target.value)}
                            type='number'
                            readOnly={action === 'View'}

                        />
                    </div>

                    {/* <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Descriptions</p>
                        <ReactQuill
                            placeholder="Enter your question"
                            style={{ height: 'auto' }}
                            value={descriptions}
                            onChange={setDescription}
                        />
                    </div> */}

                    {
                        action != 'View' && (


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


                        )
                    }

                </Spin>



            </Drawer>
        </div>
    );
}

export default MantraCategoryDrawer;
