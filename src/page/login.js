import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Input } from 'antd'
import { Link } from 'react-router-dom';
import MyButton from '../ui/button'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { userLogin } from '../api/user-registration-api';

function Login() {

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    //if token is not available then redirect to login page if valid then redirect to home page
    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('token');
        // Redirect to home page if token is present
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    //storing all the data form data object
    const formData = {

        emailAddress,
        password
    }

    //hanlding login button click 
    const handleButtonClick = async () => {

        try {

            await userLogin(formData)
            alert('Login Successful')
            // If login is successful, navigate to the "/home" route
            navigate('/');

        } catch (error) {

            alert('Login Failed : check email or password')
            console.log('error while calling api', error)
        }

    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '98vh' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '80%' }}>

                <div style={{ justifyContent: 'center', alignItems: 'left' }}>
                    <img src="/login-page-img.jpeg" alt='new-mage' style={{ height: '120%', width: '80%' }} />
                </div>

                <div>

                    <Card style={{ height: '600px', width: '620px', background: 'white', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}>


                        <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <div style={{ marginLeft: '60px', marginRight: '60px' }}>

                                <div>
                                    <h3 style={{ fontSize: '30px', fontWeight: '400', textAlign: 'center' }}>Hello! Welcome Back</h3>
                                    <p style={{ marginTop: '-20px', color: 'gray', textAlign: 'center' }}>
                                        Login with your credentials that you entered during your registration
                                    </p>

                                </div>


                                <div style={{ marginTop: '50px' }}>
                                    <p style={{ fontSize: '15px' }}>Enter Your Email Address or Mobile No</p>

                                    <Input
                                        placeholder="Enter email address or mobile no"
                                        value={emailAddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                    />
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <p style={{ fontSize: '15px' }}>Enter Your Password</p>

                                    <Input.Password
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                    />
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <MyButton
                                        title="Login"
                                        textColor="black"
                                        padding="10px 210px"
                                        borderRadius="5px"
                                        fontSize="12px"
                                        hoverColor="red"
                                        action={handleButtonClick}

                                    />
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <p style={{ textAlign: 'center' }}>
                                        Don't have an account?{' '}

                                        <Link style={{ fontWeight: '400', marginLeft: '10px' }} to="/signup">Create an Account</Link>
                                    </p>
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <p style={{ textAlign: 'center' }}>

                                        <Link style={{ fontWeight: '400', marginLeft: '10px' }} to="/signup">Forgot Your Password?</Link>
                                    </p>
                                </div>


                            </div>

                        </div>



                    </Card>
                </div>

            </div>
        </div>




    )
}

export default Login