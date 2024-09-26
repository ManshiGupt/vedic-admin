import React, { useState, useEffect, useCallback } from 'react'
import { useTokenData } from '../support/local-data-store.js';
import TVSeriesDrawer from '../component/tv-series-drawer.js';
import { Button, Spin, Table, Input, DatePicker } from 'antd'

import { getAllTVSeries, deleteTVSeries } from '../api/explore-api.js';

import AlertModelYesNo from '../component/alert-yes-no.js';


// import jwt from 'jsonwebtoken';

const { RangePicker } = DatePicker;

function TVSeries() {


    //managing states
    const [faqData, setFaqData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState([]);
    const [action, setAction] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');


    const [searchText, setSearchText] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modelData, setModelData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertData, setAlertData] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [limit, setLimit] = useState(10);

    
    const fetchData = useCallback(async () => {

        setLoading(true);

        try {


            const apiResponse = await getAllTVSeries('','');
            setFaqData(apiResponse.data);
            setTotalItems(apiResponse.totalPages);
            setLoading(false);


        } catch (error) {

            console.log('error while calling api', error);
            setLoading(false);

        }

    }, []); // useCallback dependency array


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


    const showAlertModel = (record) => {

        setShowAlert(true)
        setAlertData(record)
    }
    

    const closeAlertModel = () => {

        setShowAlert(false)
    }

    
   
    //delete data action button function
    const deleteData = async () => {

        closeAlertModel()
        await deleteTVSeries(alertData._id)

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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: 350,

        },

        {
            title: 'Sub Title',
            dataIndex: 'subTitle',
            key: 'subTitle',
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
                    <Button type="link" onClick={(e) => showDrawer(record, 'Edit')} >Edit</Button>
                    <Button type="link" onClick={(e) => showAlertModel(record)} >Delete</Button>
                </div>
            )
        }

    ];


    //handling search input text change
    const handleSearchTextChange = () => {

        setCurrentPage(1);
        setDebouncedSearchText(searchText)
    }


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

                <h3>TV Series</h3>

                <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button>

                {/* <Input
                    placeholder="Search youtube title here..."
                    value={searchText}
                    // onChange={handleSearchTextChange}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '400px', marginLeft: '10px' }}
                />

                <Button style={{ marginLeft: 10 }} onClick={() => handleSearchTextChange()}>Search</Button> */}

               


            </div>

            <Table
                dataSource={faqData.map((item, index) => ({ ...item, key: index }))}
                columns={columns}
                className="custom-table"

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


            <TVSeriesDrawer

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

export default TVSeries