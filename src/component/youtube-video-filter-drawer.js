import React, { useState } from 'react';
import { Drawer, Input, Spin, Tag, Select, Button } from 'antd';
import MyButton from '../ui/button.js';

const { Option } = Select;

const categoryData = [
    { _id: 1, title: 'Bhajan' },
    { _id: 2, title: 'Aarti' },
    { _id: 3, title: 'TV' },
    { _id: 4, title: 'Satsang' },
];

const fileTypeData = [
    { _id: 1, title: 'Sampurn Ramayan' },
    { _id: 2, title: 'Krishna' },
    { _id: 3, title: 'Mahabharat' },
    { _id: 4, title: 'Shiv Puran' },
];

function YoutubeVideoFilterDrawer({ openDrawer, closeDrawer, handleFilter }) {

    const [category, setCategory] = useState([]);
    const [fileType, setFileType] = useState([]);

    const handleCategoryChange = (values) => {
        setCategory(values);
    };

    const handleFileTypeChange = (values) => {
        setFileType(values);
    };

    const handleButtonClick = () => {

        handleFilter(category, fileType);
        closeDrawer()

    };

    const handleClearFilter = () => {

        handleFilter([], []);
        setCategory([])
        setFileType([])
        closeDrawer()
        
    }

    return (
        <Drawer
            title="Filter Youtube Video"
            onClose={closeDrawer}
            open={openDrawer}
            maskClosable={false}
            width={600}
        >
            <div>
                <div style={{ marginTop: '5px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '15px' }}>Video File Type</p>
                    <Select
                        placeholder="Select video file type"
                        value={category}
                        onChange={handleCategoryChange}
                        style={{ width: '100%' }}
                        showSearch={true}
                        mode="multiple"
                    >
                        {categoryData.map((categoryItem) => (
                            <Option key={categoryItem._id} value={categoryItem.title}>
                                {categoryItem.title}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div style={{ marginTop: '5px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '15px' }}>Video Category</p>
                    <Select
                        placeholder="Select video category"
                        value={fileType}
                        onChange={handleFileTypeChange}
                        style={{ width: '100%' }}
                        showSearch={true}
                        mode="multiple"
                    >
                        {fileTypeData.map((fileTypeItem) => (
                            <Option key={fileTypeItem._id} value={fileTypeItem.title}>
                                {fileTypeItem.title}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div style={{ marginTop: '40px', flexDirection: 'row' }}>

                    <MyButton
                        title="Filter"
                        textColor="black"
                        padding="10px 25px"
                        borderRadius="10px"
                        fontSize="12px"
                        hoverColor="red"
                        action={handleButtonClick}
                    />

                    <Button style={{ marginLeft: '10px' }} onClick={() => handleClearFilter()}>Clear</Button>

                </div>

               

            </div>
        </Drawer>
    );
}

export default YoutubeVideoFilterDrawer;