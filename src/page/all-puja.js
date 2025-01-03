import React, { useState, useCallback, useEffect } from "react";
import { getAllPuja } from "../api/puja-api";
import { Button, Input } from "antd";
import {  Table, Spin } from "antd";
import { useTokenData } from "../support/local-data-store.js";
import PujaDrawer from "../component/puja-drawer.js";


const AllPuja = () => {
  const [puja, setPuja] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const [modelData, setModelData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerData, setDrawerData] = useState([]);
  const [action, setAction] = useState("");

  const tokenData = useTokenData();
  const showDrawer = (record, action) => {
    setOpenDrawer(true);
    setDrawerData(record);
    setAction(action);
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };
  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      width: 80,
      render: (text, record, index) => index + 1,
    },

    {
      title: "Puja Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 500,
    },
    {
      title: "Rating",
      dataIndex: "avgStars",
      key: "avgStars",
      ellipsis: true,
      width: 80,
    },
    {
     
          title: "Minimum Price",
          dataIndex: "minPrice",
          key: "minPrice",
          ellipsis: true,
        },
        {
          title: "Maximum Price",
          dataIndex: "maxPrice",
          key: "maxPrice",
          ellipsis: true,
        
     
    },
    {
      title: "Action",
      key: "action",
      align: "center", // Align the content to the right
      render: (text, record) => (
        <div>
          <Button type="link" onClick={(e) => showDrawer(record, "View")}>
            View
          </Button>
          <Button type="link" onClick={(e) => showDrawer(record, "Edit")}>
            Edit
          </Button>
          {/* <Button type="link" onClick={(e) => showAlertModel(record)} >Delete</Button> */}
        </div>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const apiResponse = await getAllPuja(
        debouncedSearchText,
        category,
        currentPage,
        limit
      );
      setPuja(apiResponse.data.data);
      console.log(apiResponse.data.data);
      console.log(tokenData);
      
      setTotalItems(apiResponse.data.totalPages * limit);
      console.log("total", apiResponse.data.totalPages)
      setLoading(false);

      
    } catch (error) {
      setLoading(false);
      console.log("error while calling api", error);
    }
  }, [debouncedSearchText, category, currentPage, limit]); // useCallback dependency array

  // It will run on every page refresh or loading
  useEffect(() => {
    //calling api function
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  const handleSearchTextChange = () => {
    setCurrentPage(1);
    setDebouncedSearchText(searchText);
  };
  //on table row double click
  const tableDoubleClick = (record) => {

    setIsModalOpen(true)

    setModelData(record)
}

  return (
    <div className="p-4">
      <div className="flex gap-4">
        <div className="md:text-2xl ">All Puja</div>
        <div>
          
          <Input
            placeholder="Search Puja..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "400px", marginLeft: "10px" }}
          />
        </div>
        <div>
          <Button onClick={() => handleSearchTextChange()}>Search</Button>
          <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button>
        </div>
      </div>

      <div className="py-4">
        {/* <Table columns={columns} dataSource={data} />; */}
        {/* dataSource={userData.map((item, index) => ({ ...item, key: index }))} */}
        <Table
          dataSource={puja.map((item, index) => ({ ...item, key: index }))}
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
        <PujaDrawer
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          refreshTable={fetchData}
          drawerData={drawerData}
          action={action}
          className="custom-table"
          loading={{
            spinning: loading,
            indicator: <Spin />,
            tip: "Loading...",
            size: "medium",
          }}
        />
       
      </div>
     
    </div>
  );
};

export default AllPuja;

// import React, { useState, useEffect, useCallback } from 'react'
// import { useTokenData } from '../support/local-data-store.js';
// import UserDrawer from '../component/user-drawer.js';
// import { Button, Spin, Table, Input, DatePicker } from 'antd'
// import { getPoojaMantraApi, deleteMantra } from '../api/mantra-api.js';
// import { getAllUser } from '../api/user-api.js'
// import AlertModelYesNo from '../component/alert-yes-no.js';
// import { getAllPuja } from '../api/puja-api.js';
// // import jwt from 'jsonwebtoken';

// const { RangePicker } = DatePicker;

// function AllPuja() {

//   const [debouncedSearchText, setDebouncedSearchText] = useState('');
//   const [searchText, setSearchText] = useState('');

//   //managing states
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [drawerData, setDrawerData] = useState([]);
//   const [action, setAction] = useState('');

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modelData, setModelData] = useState([]);

//   const [showAlert, setShowAlert] = useState(false);
//   const [alertData, setAlertData] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [limit, setLimit] = useState(10);
//   const[category,setCategory]= useState([]);

//   // Access token data using the custom hook
//   const tokenData = useTokenData();

//   // Fetching data //useCallback is to prevent a component from re-rendering unless its props have changed.

//   const fetchData = useCallback(async () => {

//     setLoading(true);

//     try {
//       // await getAllUser(debouncedSearchText, currentPage, limit);
//       const apiResponse = await getAllPuja(debouncedSearchText, category, currentPage , limit);
//       setUserData(apiResponse.data.data);
//       setTotalItems(apiResponse.data.totalPages * limit);
//       setLoading(false);
//       console.log(apiResponse.data.data);

//     } catch (error) {

//       console.log('error while calling api', error);
//       setLoading(false);

//     }

//   }, [debouncedSearchText,category, currentPage, limit]); // useCallback dependency array

//   // It will run on every page refresh or loading
//   useEffect(() => {

//     //calling api function
//     fetchData();

//   }, [fetchData]); // Include fetchData in the dependency array

//   //drawer
//   const showDrawer = (record, action) => {

//     setOpenDrawer(true);
//     setDrawerData(record)
//     setAction(action)

//   };

//   const closeDrawer = () => {
//     setOpenDrawer(false);
//   };

//   //model

//   const closeModel = () => {

//     setIsModalOpen(false)
//   }

//   //alert

//   const showAlertModel = (record) => {

//     if (tokenData && tokenData.permissions.faq.delete === false) {

//       return alert('You are not authorised')
//     }

//     setShowAlert(true)
//     setAlertData(record)
//   }

//   const closeAlertModel = () => {

//     setShowAlert(false)
//   }

//   //delete data action button function
//   const deleteData = async () => {

//     closeAlertModel()
//     await deleteMantra(alertData._id)

//     // show alert message
//     alert(`Record deleted: id=${alertData._id}`);
//     fetchData(); // Call fetchData directly

//   }

//   //assign column details of the table
//   const columns = [

//     {
//       title: 'S.No',
//       dataIndex: 'index',
//       key: 'index',
//       width: 80,
//       render: (text, record, index) => index + 1,
//     },

//     {
//       title: 'Name',
//       dataIndex: 'aboutPooja',
//       key: 'aboutPooja',
//       ellipsis: true,
//       width: 300,

//     },
//     {
//       title: 'Name',
//       dataIndex: 'avgStars',
//       key: 'avgStars',
//       ellipsis: true,
//       width: 300,

//     },
//     {
//       title: 'Name',
//       dataIndex: 'poojaTag',
//       key: 'poojaTag',
//       ellipsis: true,
//       width: 300,

//     },
//     {
//       title: 'Name',
//       dataIndex: 'title',
//       key: 'poojaTag',
//       ellipsis: true,
//       width: 300,

//     },

//   ];

//   //on table row double click
//   const tableDoubleClick = (record) => {

//     setIsModalOpen(true)

//     setModelData(record)
//   }

//   const handleSearchTextChange = () => {

//     setCurrentPage(1);
//     setDebouncedSearchText(searchText)
//   }

//   return (
//     <div>
//       <div style={{ display: 'flex', alignItems: 'center' }}>

//         <h3>All User</h3>

//         {/* <Button onClick={() => showDrawer()} style={{ marginLeft: '10px' }}>Add New</Button> */}

//         <Input
//           placeholder="Search user..."
//           value={searchText}
//           // onChange={handleSearchTextChange}
//           onChange={(e) => setSearchText(e.target.value)}
//           style={{ width: '400px', marginLeft: '10px' }}
//         />

//         <Button style={{ marginLeft: 10 }} onClick={() => handleSearchTextChange()}>Search</Button>

//       </div>

//       <Table
//         dataSource={userData.map((item, index) => ({ ...item, key: index }))}
//         columns={columns}
//         className="custom-table"
//         // onRow={(record) => ({
//         //   onDoubleClick: () => tableDoubleClick(record),
//         // })}
//         // loading={{
//         //   spinning: loading,
//         //   indicator: <Spin />,
//         //   tip: 'Loading...',
//         //   size: 'medium',
//         // }}
//         // pagination={{
//         //   total: totalItems, // Replace with the actual total count of items
//         //   showSizeChanger: true,
//         //   showQuickJumper: false,
//         //   current: currentPage,
//         //   pageSize: limit,
//         //   onChange: (page) => setCurrentPage(page),
//         //   onShowSizeChange: (current, size) => setLimit(size)

//         // }}
//         // scroll={{ y: 650 }}
//         // style={{ maxHeight: '98vh' }}
//       />

//       {/* <UserDrawer

//         openDrawer={openDrawer}
//         closeDrawer={closeDrawer}
//         refreshTable={fetchData}
//         drawerData={drawerData}
//         action={action}
//         className="custom-table"
//         loading={{

//           spinning: loading,
//           indicator: <Spin />,
//           tip: 'Loading...',
//           size: 'medium'

//         }}
//       /> */}

//       <AlertModelYesNo closeAlert={closeAlertModel} showAlert={showAlert} action={deleteData} />

//     </div>
//   )
// }

// export default AllPuja
