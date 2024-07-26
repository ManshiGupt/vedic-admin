import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd'; // Import Spin component for loader
import { getAllUser } from '../api/user-api';
// import { LoadingOutlined } from '@ant-design/icons';

function AllUser() {


  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {

    const fetchData = async () => {
      try {
        const apiResponse = await getAllUser();
        setUserData(apiResponse.data.reverse());
        setLoading(false); // Set loading to false when data is fetched

      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData()

  }, []);

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      width: 80,
    },
    {
      title: 'Timestamp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAtString) => {
        const createdAtTimestamp = Date.parse(createdAtString);
        const formattedDate = new Date(createdAtTimestamp).toLocaleString(); // Convert timestamp to local date time string
        return formattedDate;
      },
      width: 220,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Contact No',
      dataIndex: 'contactNo',
      key: 'contactNo',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    // Add more columns as needed
  ];
  

  return (
    <div>
      <h3>All Users Table</h3>

      <Table
        dataSource={userData.map((item,index) => ({...item, key: index}))}
        columns={columns}
        className="custom-table"
        loading={{
          spinning: loading,
          indicator: <Spin/>,
          tip: 'Loading...',
          size: 'medium',
        }}
      />


    </div>
  );
}

export default AllUser;
