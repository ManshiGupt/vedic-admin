import React, { useState, useEffect, useCallback } from 'react'
import { useTokenData } from '../support/local-data-store.js';
import FaqHelpDrawer from '../component/faq-help-drawer.js';
import { Button, Spin, Table, Input, DatePicker } from 'antd'
import { getFaqHelp, deleteFaqHelp, downloadFaqExcelFile } from '../api/faq-help-api.js'
import FaqHelpModel from '../component/faq-help-model.js';
import AlertModelYesNo from '../component/alert-yes-no.js';
// import jwt from 'jsonwebtoken';

const { RangePicker } = DatePicker;

function FaqHelp() {


    //managing states
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelData, setModelData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState([]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [searchText, setSearchText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(10);

    // Access token data using the custom hook
    const tokenData = useTokenData();

    
    // Fetching data //useCallback is to prevent a component from re-rendering unless its props have changed.

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const apiResponse = await getFaqHelp(startDate, endDate, searchText, currentPage, limit);
            setFaqData(apiResponse.data);
            setTotalItems(apiResponse.totalPages);
            setLoading(false);


        } catch (error) {
            console.log('error while calling api', error);
            setLoading(false);
        }
    }, [startDate, endDate, searchText, currentPage, limit]); // useCallback dependency array


    // It will run on every page refresh or loading
    useEffect(() => {

        //calling api function
        fetchData();

        // // Calling API with a delay of 1 second
        // const timerId = setTimeout(() => {

        // }, 1000);

        // // Cleanup function to clear the timer
        // return () => clearTimeout(timerId);

    }, [fetchData]); // Include fetchData in the dependency array



    //drawer
    const showDrawer = (record) => {

        setOpenDrawer(true);
        setDrawerData(record)

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
        await deleteFaqHelp(alertData._id)

        // show alert message
        alert(`Record deleted: id=${alertData._id}`);
        fetchData(); // Call fetchData directly


    }


    //handling date change
    const handleDateRangeChange = (dates) => {
        if (dates && dates.length === 2) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    }

    //handling search input text change
    const handleSearchTextChange = (e) => {

        setSearchText(e.target.value);
    }

    //calling download excel api
    const downloadExcelFile = async () => {

        if(tokenData && tokenData.permissions.faq.download === false){

            return alert('You are not authorised')
        }

        if (startDate && endDate) {

            await downloadFaqExcelFile(startDate, endDate);

        } else {

            alert('Please select start date and end date')
        }


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
            width: 220,

            render: (createdAtString) => {

                const createdAtTimestamp = Date.parse(createdAtString);
                const formattedDate = new Date(createdAtTimestamp).toLocaleString();
                return formattedDate;
            }
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 400,
            ellipsis: true,

        },
        {
            title: 'Descriptions',
            dataIndex: 'descriptions',
            key: 'descriptions',
            width: 550,
            ellipsis: true,
        },

        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button type="link" onClick={(e) => showDrawer(record)} >Edit</Button>
                    <Button type="link" onClick={(e) => showAlertModel(record)} >Delete</Button>
                </div>
            )
        }

    ]

    //on table row double click
    const tableDoubleClick = (record) => {

        setIsModalOpen(true)

        setModelData(record)
    }



    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <h3>Faq & Help</h3>
                
                <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button>

                <RangePicker style={{ marginLeft: '10px' }} onChange={handleDateRangeChange} />

                <Input
                    placeholder="Search faq-help here..."
                    value={searchText}
                    onChange={handleSearchTextChange}
                    //onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '400px', marginLeft: '10px' }}
                />

                <Button onClick={() => downloadExcelFile()} style={{ marginLeft: '10px' }}>Download Excel</Button>

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
                    showQuickJumper: true,
                    current: currentPage,
                    pageSize: limit,
                    onChange: (page) => setCurrentPage(page),
                    onShowSizeChange: (current, size) => setLimit(size),
                }}
                scroll={{ y: 650 }} // Adjust the height as needed
                style={{maxHeight: '98vh'}}
            />


            <FaqHelpDrawer

                openDrawer={openDrawer}
                closeDrawer={closeDrawer}
                refreshTable={fetchData}
                drawerData={drawerData}
                className="custom-table"
                loading={{

                    spinning: loading,
                    indicator: <Spin />,
                    tip: 'Loading...',
                    size: 'medium'


                }}
            />

            <FaqHelpModel showModel={isModalOpen} closeModel={closeModel} data={modelData} />

            <AlertModelYesNo closeAlert={closeAlertModel} showAlert={showAlert} action={deleteData} />

        </div>
    )
}

export default FaqHelp