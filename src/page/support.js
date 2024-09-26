import React, { useState, useEffect, useCallback } from 'react'
import { useTokenData } from '../support/local-data-store.js';
import MantraDrawer from '../component/mantra-drawer.js';
import { Button, Spin, Table, Input, DatePicker } from 'antd'
import { getPoojaMantraApi, deleteMantra } from '../api/mantra-api.js';
import { getSupportQuery } from '../api/support-api.js';
import AlertModelYesNo from '../component/alert-yes-no.js';
// import jwt from 'jsonwebtoken';

const { RangePicker } = DatePicker;

function SupportPage() {


    //managing states
    const [faqData, setFaqData] = useState([]);
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

            const apiResponse = await getSupportQuery(currentPage, limit);
            setFaqData(apiResponse.data.data);
            setTotalItems(apiResponse.totalPages);
            setLoading(false);


        } catch (error) {

            console.log('error while calling api', error);
            setLoading(false);

        }

    }, [currentPage, limit]); // useCallback dependency array


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

        if(tokenData && tokenData.permissions.faq.delete === false){

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
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            width: 200,
           
        },

        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            ellipsis: true,
            width: 150,
           
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 250,
           
        },

        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
            width: 350,
           
        },

       
        {
            title: 'Action',
            key: 'action',
            align: 'center', // Align the content to the right
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={(e) => showDrawer(record, 'View')} >View</Button>
                    {/* <Button type="link" onClick={(e) => showDrawer(record, 'Edit')} >Edit</Button> */}
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



    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <h3>Support</h3>
                
                {/* <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button> */}


            </div>

            <Table
                dataSource={faqData.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                className="custom-table"
                onRow={(record) => ({
                    onDoubleClick: () => tableDoubleClick(record),
                })}
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
                style={{maxHeight: '98vh'}}
            />


            <MantraDrawer

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

export default SupportPage