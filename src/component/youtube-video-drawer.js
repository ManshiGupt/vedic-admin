import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin, Tag, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MyButton from '../ui/button.js';
// import MyAlertBanner from '../ui/alert';
// import { createFaqHelp, updateFaqHelp } from '../api/faq-help-api.js';
import { createYoutubeVideo, updateYoutubeVideo } from '../api/youtube-video-api.js';
import { getAllTVSeries } from '../api/explore-api.js';

const { Option } = Select;

const youtubeFileType = [
    {
        _id: 1,
        title: 'Bhajan'
    },
    {
        _id: 2,
        title: 'Aarti'
    },
    {
        _id: 3,
        title: 'TV'
    },
    {
        _id: 4,
        title: 'Satsang'
    },

]

function YoutubeVideoDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {


    const [categoryData, setCategoryData] = useState([]);

    const [title, setTitle] = useState('');
    const [videoTime, setVideoTime] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [category, setCategory] = useState([]);
    const [thumbnail, setThumbnail] = useState('');
    const [episodeNo, setEpisodeNo] = useState('');
    const [fileType, setFileType] = useState([]);
    const [index, setIndex] = useState(1)
    const [loading, setLoading] = useState(false);


    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        if (drawerData) {

            setTitle(drawerData.title || '')
            setVideoTime(drawerData.videoTime || '')
            setVideoUrl(drawerData.videoUrl || '')
            setCategory(drawerData.category || '')
            setThumbnail(drawerData.thumbnail || '')
            setEpisodeNo(drawerData.episodeNo || '')
            setFileType(drawerData.fileType || '')
            setIndex(drawerData.index || 0)

            if (action === 'View') {


            } else {

                setIsUpdating(true)

            }


        } else {

            setIsUpdating(false)
        }

        fetchYoutubeCategoryData()


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
        videoTime,
        videoUrl,
        category,
        thumbnail,
        episodeNo,
        fileType,
        index
    }


    const updateData = async () => {

        validateRequiredField()

        setLoading(true)

        try {

            //make the update api call
            await updateYoutubeVideo(drawerData._id, formData)

            setTimeout(() => {

                // Display success alert and close the drawer if title and description are not empty
                setLoading(false)
                alert('Data Updated Successfully...!');

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



    const fetchYoutubeCategoryData = async () => {

        try {

            const response = await getAllTVSeries('', 20);

            console.log('youtub video category', response.data)

            const additionalCategories = [

                { _id: 112, title: 'Other' }

            ];

            setCategoryData([...response.data, ...additionalCategories]);
    
            // console.log('category data', response.data.data)
    
        } catch (error) {

            console.log('category data list error', error);
        }
    };



    const resetDrawer = () => {

        closeDrawer()
        setIsUpdating(false)
        setTitle('')
        setVideoTime('')
        setVideoUrl('')
        setCategory([])
        setThumbnail('')
        setEpisodeNo('')
        setFileType([])
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
                await createYoutubeVideo(formData);

                setTimeout(() => {

                    // Display success alert and close the drawer if title and description are not empty
                    setLoading(false)
                    // console.log(formData);
                    alert('Data Submitted Successfully...!');

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


    const handleFileTypeChange = (values) => {

        setFileType(values);
    };


    const handleCategoryChange = (values) => {

        setCategory(values);
    };






    return (
        <div>

            <Drawer title={isUpdating ? "Update Youtube Video" : action === 'View' ? "Youtube Video" : "Add Youtube Video"}

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
                            placeholder="Enter video url"
                            value={thumbnail}
                            onChange={(e) => setThumbnail(e.target.value)}
                            readOnly={action === 'View'}

                        />
                    </div>

                    {
                        thumbnail != '' && (

                            <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', marginTop: '10px' }}>
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
                        <p style={{ fontSize: '15px' }}>Video Time</p>
                        <Input
                            placeholder="Enter video time"
                            value={videoTime}
                            onChange={(e) => setVideoTime(e.target.value)}
                            readOnly={action === 'View'}

                        />
                    </div>



                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Youtube Video Id</p>
                        <Input
                            placeholder="Enter youtube video id"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            readOnly={action === 'View'}

                        />
                    </div>


                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Video File Type</p>
                        <Select
                            placeholder="Select video file type"
                            value={fileType}
                            onChange={handleFileTypeChange}
                            style={{ width: '100%' }}
                            showSearch={true}
                            readOnly={action === 'View'}
                            mode="multiple"
                        >
                            {youtubeFileType.map(fileTypeItem => (

                                <Option key={fileTypeItem._id} value={fileTypeItem.title}>

                                    {fileTypeItem.title}

                                </Option>
                            ))}
                        </Select>
                    </div>



                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Video Category</p>
                        <Select
                            placeholder="Select video category"
                            value={category}
                            onChange={handleCategoryChange}
                            style={{ width: '100%' }}
                            showSearch={true}
                            readOnly={action === 'View'}
                            mode="multiple"
                        >
                            {categoryData.map(categoryItem => (

                                <Option key={categoryItem._id} value={categoryItem.title}>

                                    {categoryItem.title}

                                </Option>
                            ))}
                        </Select>
                    </div>




                    <div>
                        <p style={{ fontSize: '15px' }}>Episode No</p>
                        <Input
                            placeholder="Enter Episode No"
                            value={episodeNo}
                            onChange={(e) => setEpisodeNo(e.target.value)}

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

export default YoutubeVideoDrawer;
