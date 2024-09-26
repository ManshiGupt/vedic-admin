import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin, Select, Checkbox, Radio } from 'antd';
import MyButton from '../ui/button.js';
import { createYoutubeVideo, updateYoutubeVideo } from '../api/youtube-video-api.js';
// import { getAllTVSeries } from '../api/explore-api.js';
import { updateUserProfile, } from '../api/user-api.js';
import ReactQuill from 'react-quill';
import { updatePost } from '../api/post-api.js';

const { Option } = Select;


const underReviewText = "Thanks for your submission! Our team is reviewing your post to ensure it aligns with our guidelines. We'll update your post status shortly. Appreciate your patience!"
const liveText = 'Your post has been approved and is now live in the Vedic Family community. Thank you for your cooperation'


function PostDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {


    const [userId, setUserId] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userName, setUserName] = useState('');
    const [postText, setPostText] = useState('');
    const [status, setStatus] = useState('');

    const [statusRemark, setStatusRemark] = useState('');
    const [postImage, setPostImage] = useState('');

    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {

        if (drawerData) {

            setUserId(drawerData.userId || '');
            setProfilePic(drawerData.profilePic || '');
            setUserName(drawerData.userName || '');
            setPostText(drawerData.postText || '');
            setStatus(drawerData.status || '');
            setStatusRemark(drawerData.statusRemark || '');
            setPostImage(drawerData.postImage || '');

            setIsUpdating(action !== 'View');

        } else {

            setIsUpdating(false);

        }



    }, [drawerData]);



    useEffect(() => {

        if (status === 'Live') {

            setStatusRemark(liveText);

        } else if (status === 'Under Review') {

            setStatusRemark(underReviewText);
            
        }

    }, [status]);


    const formData = {

        status,
        statusRemark
    };


    const resetDrawer = () => {

        closeDrawer();
        setIsUpdating(false);

        setUserId('');
        setProfilePic('');
        setUserName('');
        setPostText('');
        setStatus('');
        setStatusRemark('');
        setPostImage('');


    };

    const buttonClick = async () => {

        setLoading(true);

        try {

            if (isUpdating) {


                await updatePost(drawerData._id, formData);
                alert('Data Updated Successfully!');

            } else {
                // await createYoutubeVideo(formData);
                // alert('Data Submitted Successfully!');
            }
            resetDrawer();
            refreshTable();
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <Drawer
            title={isUpdating ? "Update User Data" : action === 'View' ? "User Data" : "Add Youtube Video"}
            onClose={resetDrawer}
            open={openDrawer}
            maskClosable={false}
            width={800}
        >
            <Spin tip="Loading..." spinning={loading}>

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
                    <p style={{ fontSize: '15px' }}>User Id</p>
                    <Input
                        // placeholder="Enter mantra title"
                        value={userId}
                        // onChange={(e) => setTitle(e.target.value)}
                        readOnly
                        style={{ color: 'gray' }}
                    />
                </div>


                <div style={{}}>
                    <p>Post Status</p>

                    <Radio.Group onChange={e => setStatus(e.target.value)} value={status} style={{ display: 'flex' }}>
                        <div>
                            <Radio value="Under Review">Under Review</Radio>
                        </div>
                        <div>
                            <Radio value="Live">Live</Radio>
                        </div>

                    </Radio.Group>

                </div>


                <div style={{ marginTop: '30px' }}>
                    <p style={{ fontSize: '15px' }}>Post Text</p>
                    <ReactQuill
                        placeholder="Post text"
                        style={{ height: 'auto' }}
                        value={postText}
                        onChange={setPostText}
                        readOnly={action === 'View'}
                    />
                </div>


                <div style={{ marginTop: '30px' }}>
                    <p style={{ fontSize: '15px' }}>Status Remark</p>
                    <Input.TextArea
                        placeholder="Status Remark"
                        value={statusRemark}
                        // onChange={(e) => setStatusRemark(e.target.value)}
                        readOnly
                        autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                </div>


                {
                    postImage != '' && (

                        <div style={{ aspectRatio: 1 / 1, position: 'relative', marginTop: '10px' }}>
                            <img
                                src={postImage}
                                alt="post_pic"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>


                    )
                }



                {action !== 'View' && (
                    <div style={{ marginTop: '30px' }}>
                        <MyButton title={isUpdating ? "Update" : "Submit"} action={buttonClick} />
                    </div>
                )}

            </Spin>
        </Drawer>
    );
}

export default PostDrawer;
