import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin, Tag, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MyButton from '../ui/button.js';
// import MyAlertBanner from '../ui/alert';
// import { createFaqHelp, updateFaqHelp } from '../api/faq-help-api.js';
import { createMantra, updateMantra, getMantraCategory } from '../api/mantra-api.js';

const { Option } = Select;

function MantraDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {


    // const [showBanner, setShowBanner] = useState(false);
    const [title, setTitle] = useState('');
    const [mantra, setMantra] = useState('');
    const [mantraBhaavaarth, setMantraBhaavaarth] = useState('');
    const [mantraShabdaarth, setMantraShabdaarth] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [shlokNo, setShlokNo] = useState('1');
    const [exercise, setExercise] = useState('1');
    const [index, setIndex] = useState(1)
    const [loading, setLoading] = useState(false);


    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        if (drawerData) {

            setTitle(drawerData.title || '')
            setMantra(drawerData.mantra || '')
            setMantraBhaavaarth(drawerData.mantraBhaavaarth || '')
            setMantraShabdaarth(drawerData.mantraShabdaarth || '')
            setCategory(drawerData.category || '')
            setExercise(drawerData.exercise || '')
            setShlokNo(drawerData.shlokNo || '')
            setIndex(drawerData.index || 0)

            if (action === 'View') {


            } else {

                setIsUpdating(true)

            }


        } else {

            setIsUpdating(false)
        }

        fetchMantraCategoryData()

    }, [drawerData])


    const validateRequiredField = () => {

        if (mantra.trim() === '<p><br></p>'
            || mantraBhaavaarth.trim() === '<p><br></p>' || mantraShabdaarth.trim() === '<p><br></p>'
            || shlokNo.trim() === '') {

            // Display error alert if title or description is empty

            setLoading(false)

            alert('Please enter title and index.')

            return;


        }

    }


    const fetchMantraCategoryData = async () => {
        try {
            const response = await getMantraCategory('', 20);
            const additionalCategories = [
                { _id: 111, title: 'Geeta' },
                { _id: 112, title: 'Other' }
            ];
            setCategoryData([...response.data.data, ...additionalCategories]);
    
            // console.log('category data', response.data.data)
    
        } catch (error) {
            console.log('category data list error', error);
        }
    };


    const formData = {

        title,
        mantra,
        mantraBhaavaarth,
        mantraShabdaarth,
        category,
        shlokNo,
        exercise,
        index
    }


    const updateData = async () => {

        validateRequiredField()

        setLoading(true)

        try {

            //make the update api call
            await updateMantra(drawerData._id, formData)

            setTimeout(() => {

                // Display success alert and close the drawer if title and description are not empty
                setLoading(false)
                alert('Data Updated Successfully...!');

                //after successful refresh the table
                refreshTable()

                //reset form filed
                setTitle('')
                // setDescription('')
                setIndex(0)

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
        // setDescription('')
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
                await createMantra(formData);

                setTimeout(() => {

                    // Display success alert and close the drawer if title and description are not empty
                    setLoading(false)
                    // console.log(formData);
                    alert('Data Submitted Successfully...!');

                    //after successful refresh the table
                    refreshTable()

                    //reset form filed
                    setTitle('')
                    // setDescription('')
                    setIndex(0)

                    //close drawer
                    closeDrawer()


                }, 1000);

            }

        } catch (error) {

            console.log('mantra create', error)

        }



    };


    const handleCategoryChange = (values) => {
        setCategory(values);
    };



    return (
        <div>

            <Drawer title={isUpdating ? "Update Mantra" : action === 'View' ? "Mantra" : "Add Mantra"}

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

                    <div>
                        <p style={{ fontSize: '15px' }}>Title</p>
                        <Input
                            placeholder="Enter mantra title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            readOnly={action === 'View'}
                        />
                    </div>


                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Mantra</p>
                        <Input.TextArea
                            placeholder="Enter mantra"
                            value={mantra}
                            onChange={(e) => setMantra(e.target.value)}
                            readOnly={action === 'View'}
                            autoSize={{ minRows: 2, maxRows: 6 }} // Adjust the number of rows as needed
                        />
                    </div>



                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Mantra Shabdaarth</p>
                        <Input.TextArea
                            placeholder="Enter mantra shabdaarth"
                            value={mantraShabdaarth}
                            onChange={(e) => setMantraShabdaarth(e.target.value)}
                            readOnly={action === 'View'}
                            autoSize={{ minRows: 2, maxRows: 6 }} // Adjust the number of rows as needed
                        />
                    </div>



                    <div style={{ marginTop: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Mantra Bhaavaarth</p>
                        <ReactQuill
                            placeholder="Enter mantra bhaavarth"
                            style={{ height: 'auto' }}
                            value={mantraBhaavaarth}
                            onChange={setMantraBhaavaarth}
                            readOnly={action === 'View'}
                        />
                    </div>


                    <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                        <p style={{ fontSize: '15px' }}>Mantra Category</p>
                        <Select
                            placeholder="Select mantra category"
                            value={category}
                            onChange={handleCategoryChange}
                            style={{ width: '100%' }}
                            showSearch={true}
                            readOnly={action === 'View'}
                            mode="multiple" // Allow multiple selections
                        >
                            {categoryData.map(categoryItem => (
                                <Option key={categoryItem._id} value={categoryItem.title}>
                                    {categoryItem.title}
                                </Option>
                            ))}
                        </Select>
                    </div>




                    <div>
                        <p style={{ fontSize: '15px' }}>Shlok No</p>
                        <Input
                            placeholder="Enter shlok no"
                            value={shlokNo}
                            onChange={(e) => setShlokNo(e.target.value)}

                            readOnly={action === 'View'}

                        />
                    </div>

                    <div>
                        <p style={{ fontSize: '15px' }}>Exercise No</p>
                        <Input
                            placeholder="Enter exercise no"
                            value={exercise}
                            onChange={(e) => setExercise(e.target.value)}

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

export default MantraDrawer;
