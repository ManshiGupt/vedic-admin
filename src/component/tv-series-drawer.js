import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin, Tag, Select } from 'antd';
import 'react-quill/dist/quill.snow.css';
import MyButton from '../ui/button.js';
import { createTVSeries, updateTVSeries } from '../api/explore-api.js';



function TVSeriesDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {


    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [index, setIndex] = useState(1)
    const [loading, setLoading] = useState(false);


    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        if (drawerData) {

            setTitle(drawerData.title || '')
            setSubTitle(drawerData.subTitle || '')
            setThumbnail(drawerData.imageUrl || '')
            setIndex(drawerData.index || 0)

            if (action === 'View') {


            } else {

                setIsUpdating(true)

            }


        } else {

            setIsUpdating(false)
        }


    }, [drawerData])


    const validateRequiredField = () => {

        if (title.trim() === '') {

            // Display error alert if title or description is empty

            setLoading(false)

            alert('Please enter title and index.')

            return;


        }

    }




    const formData = {

        title,
        subTitle,
        imageUrl: thumbnail,
        index
    }


    const updateData = async () => {

        validateRequiredField()

        setLoading(true)

        try {

            //make the update api call
            await updateTVSeries(drawerData._id, formData)

            setTimeout(() => {

                // Display success alert and close the drawer if title and description are not empty
                setLoading(false)
                alert('Data Updated Successfully...!');

                //clear table data
                resetDrawer()

                //after successful refresh the table
                refreshTable()

                //close drawer
                closeDrawer()


            }, 1000);

        } catch (error) {

            console.log('update mantra', error)

        }


    }


    const resetDrawer = () => {

        closeDrawer()
        setIsUpdating(false)

        setTitle('')
        setSubTitle('')
        setThumbnail('')
        setIndex(0)

    }


    const buttonClick = async (e) => {

        setLoading(true)

        validateRequiredField()

        try {

            if (isUpdating) {

                updateData()

            } else {

                // Make the API call to create faq-help
                await createTVSeries(formData);

                setTimeout(() => {

                    // Display success alert and close the drawer if title and description are not empty
                    setLoading(false)
                    // console.log(formData);
                    alert('Data Submitted Successfully...!');

                    //clear table data
                    resetDrawer()

                    //after successful refresh the table
                    refreshTable()

                    //close drawer
                    closeDrawer()


                }, 1000);

            }

        } catch (error) {

            console.log('mantra create', error)

        }



    };



    return (
        <div>

            <Drawer title={isUpdating ? "Update TV Series" : action === 'View' ? "TV Series" : "Add TV Series"}

                onClose={resetDrawer} open={openDrawer} maskClosable={false} width={800}>

                <Spin tip="Loading..." size="medium" spinning={loading}>

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

                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Thumbnail Url</p>
                        <Input
                            placeholder="Enter thumbnail url"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                            readOnly={action === 'View'}

                        />
                    </div>

                    {
                        thumbnail !== '' && (
                            <div style={{ position: 'relative', marginTop: '10px', height: 450, width: 300 }}>
                                <img
                                    src={thumbnail}
                                    alt="Thumbnail Preview"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        )
                    }

                    <div>
                        <p style={{ fontSize: '15px' }}>Title</p>
                        <Input
                            placeholder="Enter youtube title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly={action === 'View'}
                        />
                    </div>


                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Sub Title</p>
                        <Input
                            placeholder="Enter subtitle"
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
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


                <div style={{ marginBottom: '50px' }}>

                </div>



            </Drawer>

        </div>
    );
}

export default TVSeriesDrawer;
