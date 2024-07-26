import React, { useState, useEffect } from 'react'
import { Card, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../ui/button'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { userRegistration } from '../api/user-registration-api';


function SignUp() {

  const [userName, setUserName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');

  //initializing useNavigate()
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

    name: userName,
    emailAddress: emailAddress,
    contactNo: mobileNo,
    password: password,

  }


  //hanlding login button click 
  const handleRegistration = async () => {

    try {

      await userRegistration(formData)
      alert('Registration Success')

      // Call redirectToLoginPage to render the Login component

      navigate('/login')

    } catch (error) {

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

          <Card style={{ height: '750px', width: '620px', background: 'white', boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)' }}>


            <div style={{ display: 'flex', justifyContent: 'center' }}>

              <div style={{ marginLeft: '60px', marginRight: '60px' }}>

                <div>
                  <h3 style={{ fontSize: '30px', fontWeight: '400', textAlign: 'center' }}>Welcome to Vedic Pandit</h3>
                  <p style={{ marginTop: '-20px', color: 'gray', textAlign: 'center', marginLeft: '30px', marginRight: '30px' }}>
                    Enter the login information for your account. You will be able to create additional users after registration.
                  </p>

                </div>


                <div style={{ marginTop: '50px' }}>
                  <p style={{ fontSize: '15px' }}>Enter Your Full Name</p>

                  <Input
                    placeholder="Enter full Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>


                <div style={{ marginTop: '25px' }}>
                  <p style={{ fontSize: '15px' }}>Enter Your Email Address</p>

                  <Input
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                  />
                </div>


                <div style={{ marginTop: '25px' }}>
                  <p style={{ fontSize: '15px' }}>Enter Your Mobile No</p>

                  <Input
                    placeholder="Enter mobile no"
                    value={mobileNo}
                    type='number'
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: '25px' }}>
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
                    title="Register"
                    textColor="black"
                    padding="10px 210px"
                    borderRadius="5px"
                    fontSize="12px"
                    hoverColor="red"
                    action={handleRegistration}

                  />
                </div>

                <div style={{ marginTop: '30px' }}>
                  <p style={{ textAlign: 'center' }}>
                    Have an account?{' '}

                    <Link style={{ fontWeight: '400', marginLeft: '10px' }} to="/login">Login</Link>
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

export default SignUp