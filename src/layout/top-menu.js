import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';


const TopMenuBar = () => {

    //initialising useNavigate
    const navigate = useNavigate();

    const handleLogout = () => {

        //clear localstorage token
        localStorage.clear();

        alert('Logout Successful')

        //redirect login screen
        navigate('/login');
    }

    return (

        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px', float: 'right', width: '450px' }}>

            <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BellOutlined />}>
                Notifications
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
                Settings
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>

        </Menu>

    );
};

export default TopMenuBar;