import React, { useEffect, useState } from 'react';
import { Drawer, Input, Spin, Select, Checkbox, Radio } from 'antd';
import MyButton from '../ui/button.js';
import { createYoutubeVideo, updateYoutubeVideo } from '../api/youtube-video-api.js';
// import { getAllTVSeries } from '../api/explore-api.js';
import { updateUserProfile } from '../api/user-api.js';

const { Option } = Select;

const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

const genderOptions = ['Male', 'Female', 'Other'];

const profileStatusOptions = ['Verified', 'Not Verified'];



function UserDrawer({ openDrawer, closeDrawer, refreshTable, drawerData, action }) {

    const [categoryData, setCategoryData] = useState([]);

    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [age, setAge] = useState('');
    const [areaPinCode, setAreaPinCode] = useState('');
    const [email, setEmail] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [gender, setGender] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [landMark, setLandmark] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [profileStatus, setProfileStatus] = useState('');
    const [state, setState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {

        if (drawerData) {

            setName(drawerData.name || '');
            setContactNo(drawerData.contactNo || '');
            setAadharNo(drawerData.aadharNo || '');
            setAge(drawerData.age || '');
            setAreaPinCode(drawerData.areaPinCode || '');
            setEmail(drawerData.email || '');
            setFullAddress(drawerData.fullAddress || '');
            setGender(drawerData.gender || '');
            setHouseNo(drawerData.houseNo || '');
            setLandmark(drawerData.landMark || '');
            setProfilePic(drawerData.profilePic || '');
            setProfileStatus(drawerData.profileStatus || '');
            setState(drawerData.state || '');

            setIsUpdating(action !== 'View');

        } else {

            setIsUpdating(false);

        }



    }, [drawerData]);


   

    const formData = {
        name,
        contactNo,
        aadharNo,
        age,
        areaPinCode,
        email,
        fullAddress,
        gender,
        houseNo,
        landMark,
        profilePic,
        profileStatus,
        state
    };

    const resetDrawer = () => {
        closeDrawer();
        setIsUpdating(false);
        setName('');
        setContactNo('');
        setAadharNo('');
        setAge('');
        setAreaPinCode('');
        setEmail('');
        setFullAddress('');
        setGender('');
        setHouseNo('');
        setLandmark('');
        setProfilePic('');
        setProfileStatus('');
        setState('');
    };

    const buttonClick = async () => {

        setLoading(true);

        try {
            if (isUpdating) {
                await updateUserProfile(drawerData._id, formData);
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



    const handleStateChange = (values) => {

        setState(values);
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


                {
                    profilePic != '' && (

                        <div style={{ aspectRatio: 1/1, position: 'relative', marginTop: '10px' }}>
                            <img
                                src={profilePic}
                                alt="profile_pic"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>


                    )
                }

                <div style={{}}>
                    <p>Profile Status</p>
                    <Radio.Group onChange={e => setProfileStatus(e.target.value)} value={profileStatus} style={{ display: 'flex' }}>
                        <div>
                            <Radio value="Not Verified">Not Verified</Radio>
                        </div>
                        <div>
                            <Radio value="Pending">Pending</Radio>
                        </div>
                        <div>
                            <Radio value="Verified">Verified</Radio>
                        </div>

                    </Radio.Group>
                </div>


                <div>
                    <p>Name</p>
                    <Input value={name} onChange={e => setName(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div>
                    <p>Contact No</p>
                    <Input value={contactNo} onChange={e => setContactNo(e.target.value)} readOnly />
                </div>

                <div>
                    <p>Email</p>
                    <Input value={email} onChange={e => setEmail(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div>
                    <p>Aadhar No</p>
                    <Input value={aadharNo} onChange={e => setAadharNo(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div style={{ marginBottom: 10 }}>
                    <p>Age</p>
                    <Input value={age} onChange={e => setAge(e.target.value)} readOnly={action === 'View'} />
                </div>


                <div style={{ marginBottom: 30 }}>


                    <p>Gender</p>

                    <Radio.Group onChange={e => setGender(e.target.value)} value={gender} style={{ display: 'flex' }}>
                        <div>
                            <Radio value="Male">Male</Radio>
                        </div>
                        <div>
                            <Radio value="Female">Female</Radio>
                        </div>
                        <div>
                            <Radio value="Other">Other</Radio>
                        </div>
                    </Radio.Group>

                </div>


                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <div style={{ fontSize: 18, marginTop: 20 }}>Other Details</div>

                    <div style={{ marginLeft: 10, width: '80%', height: 4, marginTop: 20, background: 'linear-gradient(90deg, #FF9800, hsla(0, 0%, 100%, 0)' }}>
                    </div>

                </div>


                <div style={{ marginTop: 50 }}>
                    <p>House No/Plot No/Gali No</p>
                    <Input value={houseNo} onChange={e => setHouseNo(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div>
                    <p>landmark/Near By</p>
                    <Input value={landMark} onChange={e => setLandmark(e.target.value)} readOnly={action === 'View'} />
                </div>


                <div>
                    <p>Full Address</p>
                    <Input value={fullAddress} onChange={e => setFullAddress(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div>
                    <p>Area Pin Code</p>
                    <Input value={areaPinCode} onChange={e => setAreaPinCode(e.target.value)} readOnly={action === 'View'} />
                </div>

                <div style={{ marginTop: '10px', marginBottom: '30px' }}>
                    <p style={{ fontSize: '15px' }}>State</p>
                    <Select
                        placeholder="Select state"
                        value={state}
                        onChange={handleStateChange}
                        style={{ width: '100%' }}
                        showSearch={true}
                        readOnly={action === 'View'}
                    // mode="multiple"
                    >
                        {indianStates.map(stateItem => (

                            <Option key={stateItem} value={stateItem}>

                                {stateItem}

                            </Option>
                        ))}

                    </Select>
                </div>


                {/* <div>
                    <p>Gender</p>
                    <Select value={gender} onChange={value => setGender(value)} disabled={action === 'View'}>
                        {genderOptions.map(g => <Option key={g} value={g}>{g}</Option>)}
                    </Select>
                </div>

                <div>
                    <p>Profile Status</p>
                    <Select value={profileStatus} onChange={value => setProfileStatus(value)} disabled={action === 'View'}>
                        {profileStatusOptions.map(status => <Option key={status} value={status}>{status}</Option>)}
                    </Select>
                </div>

                <div>
                    <p>State</p>
                    <Select value={state} onChange={value => setState(value)} disabled={action === 'View'}>
                        {indianStates.map(st => <Option key={st} value={st}>{st}</Option>)}
                    </Select>
                </div> */}

                {action !== 'View' && (
                    <div style={{ marginTop: '30px' }}>
                        <MyButton title={isUpdating ? "Update" : "Submit"} action={buttonClick} />
                    </div>
                )}

            </Spin>
        </Drawer>
    );
}

export default UserDrawer;
