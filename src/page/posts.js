import React, { useState, useEffect, useCallback } from 'react'
import { useTokenData } from '../support/local-data-store.js';
import UserDrawer from '../component/user-drawer.js';
import { Button, Spin, Table, Input, DatePicker } from 'antd'
import { getPoojaMantraApi, deleteMantra } from '../api/mantra-api.js';
import { getAllPost } from '../api/post-api.js';
import AlertModelYesNo from '../component/alert-yes-no.js';
import PostDrawer from '../component/post-drawer.js';
// import jwt from 'jsonwebtoken';

const { RangePicker } = DatePicker;

function Posts() {

    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [searchText, setSearchText] = useState('');


    //managing states
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState([]);
    const [action, setAction] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelData, setModelData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(10);

    // Access token data using the custom hook
    const tokenData = useTokenData();


    // Fetching data //useCallback is to prevent a component from re-rendering unless its props have changed.

    const fetchData = useCallback(async () => {

        setLoading(true);

        try {

            const apiResponse = await getAllPost(debouncedSearchText, currentPage, limit);
            setPostData(apiResponse.data.data);
            setTotalItems(apiResponse.data.totalPages * limit);
            setLoading(false);


        } catch (error) {

            console.log('error while calling api', error);
            setLoading(false);

        }

    }, [debouncedSearchText, currentPage, limit]); // useCallback dependency array


    // It will run on every page refresh or loading
    useEffect(() => {

        //calling api function
        fetchData();


    }, [fetchData]); // Include fetchData in the dependency array



    //drawer
    const showDrawer = (record, action) => {

        setOpenDrawer(true);
        setDrawerData(record)
        setAction(action)

    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    //model

    const closeModel = () => {

        setIsModalOpen(false)
    }

    //alert

    const showAlertModel = (record) => {

        if (tokenData && tokenData.permissions.faq.delete === false) {

            return alert('You are not authorised')
        }

        setShowAlert(true)
        setAlertData(record)
    }

    const closeAlertModel = () => {

        setShowAlert(false)
    }

    //delete data action button function
    const deleteData = async () => {

        closeAlertModel()
        await deleteMantra(alertData._id)

        // show alert message
        alert(`Record deleted: id=${alertData._id}`);
        fetchData(); // Call fetchData directly


    }


    const renderUserProfile = (profileUrl) => {

        return (

            <>


                <div style={{ height: '50px', width: '50px', justifyContent: 'center', alignItems: 'center', borderRadius: 25, background: '#f0f0f0' }}>


                    {profileUrl && (


                        <img
                            src={profileUrl}
                            alt="profile_pic"
                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 25 }}
                        />


                    )}


                </div>




            </>



        )
    }


    const renderStatus = (status) => {
        return (
            <div style={{
                background: status === 'Live' ? '#5CED73' : '#FF6242',
                borderRadius: 20,
                padding: '5px',
                textAlign: 'center',
                color: 'white',
                display: 'inline-block',
                paddingLeft: 30,
                paddingRight: 30
            }}>
                {status}
            </div>
        );
    };
    



    //assign column details of the table
    const columns = [

        {
            title: 'S.No',
            dataIndex: 'index',
            key: 'index',
            width: 80,
            render: (text, record, index) => index + 1,
        },

        {
            title: 'Profile',
            dataIndex: 'profilePic',
            key: 'profilePic',
            width: 120,
            render: (profilePic) => {

                return renderUserProfile(profilePic)
            }
        },


        {
            title: 'Timestamp',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
            render: (createdAtString) => {
                const createdAtTimestamp = Date.parse(createdAtString);
                const formattedDate = new Date(createdAtTimestamp).toLocaleString();
                return formattedDate;
            }
        },



        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
            ellipsis: true,
            width: 250,

        },

        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
            ellipsis: true,
            width: 300,

        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            align: 'center',
            render: (status) => {

                return renderStatus(status)
            }

        },




        {
            title: 'Action',
            key: 'action',
            align: 'center', // Align the content to the right
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={(e) => showDrawer(record, 'View')} >View</Button>
                    <Button type="link" onClick={(e) => showDrawer(record, 'Edit')} >Edit</Button>
                    {/* <Button type="link" onClick={(e) => showAlertModel(record)} >Delete</Button> */}
                </div>
            )
        }

    ];

    //on table row double click
    const tableDoubleClick = (record) => {

        setIsModalOpen(true)

        setModelData(record)
    }


    const handleSearchTextChange = () => {

        setCurrentPage(1);
        setDebouncedSearchText(searchText)
    }



    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <h3>All Posts</h3>

                {/* <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button> */}

                <Input
                    placeholder="Search posts..."
                    value={searchText}
                    // onChange={handleSearchTextChange}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '400px', marginLeft: '10px' }}
                />

                <Button style={{ marginLeft: 10 }} onClick={() => handleSearchTextChange()}>Search</Button>


            </div>

            <Table
                dataSource={postData.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                className="custom-table"
                // onRow={(record) => ({
                //     onDoubleClick: () => tableDoubleClick(record),
                // })}
                loading={{
                    spinning: loading,
                    indicator: <Spin />,
                    tip: 'Loading...',
                    size: 'medium',
                }}
                pagination={{
                    total: totalItems, // Replace with the actual total count of items
                    showSizeChanger: true,
                    showQuickJumper: false,
                    current: currentPage,
                    pageSize: limit,
                    onChange: (page) => setCurrentPage(page),
                    onShowSizeChange: (current, size) => setLimit(size)

                }}
                scroll={{ y: 650 }}
                style={{ maxHeight: '98vh' }}
            />


            <PostDrawer

                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
                refreshTable={fetchData}
                drawerData={drawerData}
                action={action}
                className="custom-table"
                loading={{

                    spinning: loading,
                    indicator: <Spin />,
                    tip: 'Loading...',
                    size: 'medium'


                }}
            />


            <AlertModelYesNo closeAlert={closeAlertModel} showAlert={showAlert} action={deleteData} />

        </div>
    )
}

export default Posts