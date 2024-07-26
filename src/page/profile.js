import React from "react";
import { Button, Input, Card } from "antd";

const Profile = () => {


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Profile</h3>
                <Button style={{ marginLeft: '10px', }}>
                    Create User
                </Button>
            </div>

            <div>

                <Card style={{ paddingBottom: '20px', paddingLeft: '20px' }}>
                    <h4>Personal Information</h4>

                    <div>
                        <p>Your Name</p>
                        <Input value={"Ravi Shankar"} readOnly style={{ width: '30%' }} />
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <p>Your Email Address</p>
                        <Input value={"motionofknowledge@gmail.com"} readOnly style={{ width: '30%' }} />
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <p>Your Email Address</p>
                        <Input value={"motionofknowledge@gmail.com"} readOnly style={{ width: '30%' }} />
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <p>Your Email Address</p>
                        <Input value={"motionofknowledge@gmail.com"} readOnly style={{ width: '30%' }} />
                    </div>

                    <div style={{marginTop: '30px'}}>
                        <p>Your Email Address</p>
                        <Input value={"motionofknowledge@gmail.com"} readOnly style={{ width: '30%' }} />
                    </div>

                </Card>

            </div>

        </div>
    );
};

export default Profile;
