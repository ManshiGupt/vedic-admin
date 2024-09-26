import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    // HomeOutlined,
    UserOutlined,
    // SettingOutlined,
    // LogoutOutlined,
    BarChartOutlined,
    BugOutlined,
    // BookOutlined,
    ProductOutlined,
    ShoppingCartOutlined,
    QuestionCircleOutlined,
    CustomerServiceOutlined,
    DoubleRightOutlined,

} from '@ant-design/icons';



const SidebarMenu = () => {

    return (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>


            <div style={{ marginTop: '5px', marginBottom: '15px', textAlign: 'left', display: 'flex' }}>

                {/* <img src="https://vedic.com/my-logo.png" alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} /> */}
                <img src="/logo-demo-removebg.png" alt="Logo" style={{ maxWidth: '35%', height: '35%' }} />

                <h3 style={{ marginLeft: '1px', color: 'white', marginTop: '30px' }}>Admin Panel</h3>

            </div>

            <div style={{height: '85vh', overflow: 'scroll', scrollbarWidth: 'none'}}>

                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>

                    <Menu.Item key="12" icon={<img src="/kumbh-kalash-icon.svg" alt="pooja"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/all-pooja">Poojas</Link>
                    </Menu.Item>

                    <Menu.Item key="2" icon={<UserOutlined />}>
                        <Link to="/user-profile">Users</Link>
                    </Menu.Item>

                   

                    <Menu.Item key="21" icon={<img src="/meditation-icon.svg" alt="pandit"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/all-pandit">Pandits</Link>
                    </Menu.Item>

                    <Menu.Item key="211" icon={<img src="/check-icon.svg" alt="booking"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/bookings">Bookings</Link>
                    </Menu.Item>

                    <Menu.Item key="2111" icon={<ShoppingCartOutlined />}>
                        <Link to="/orders">Orders</Link>
                    </Menu.Item>

                    <Menu.Item key="21lkd912803111" icon={<ShoppingCartOutlined />}>
                        <Link to="/posts">Posts</Link>
                    </Menu.Item>

                    <Menu.Item key="21111" icon={<ProductOutlined />}>
                        <Link to="/samagri">Samagries</Link>
                    </Menu.Item>

                    <Menu.Item key="211111122" icon={<img src="/review-icon.svg" alt="user-review"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/user-feedback">User Reviews</Link>
                    </Menu.Item>

                    <Menu.Item key="2111111" icon={<img src="/review-icon.svg" alt="pandit-review"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/pandit-reviews">Pandit Reviews</Link>
                    </Menu.Item>

                    <Menu.Item key="thoughts" icon={<img src="/brain-illustration-icon.svg" alt="Thoughts"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/thoughts">Thoughts</Link>
                    </Menu.Item>


                    <Menu.Item key="211111111" icon={<img src="/atom-icon.svg" alt="Mantra-Category"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/mantra-category">Mantra Category</Link>
                    </Menu.Item>

                    <Menu.Item key="21111aab1111" icon={<img src="/atom-icon.svg" alt="Mantra"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/mantra">Mantra</Link>
                    </Menu.Item>

                    <Menu.Item key="2aklab1111" icon={<DoubleRightOutlined />}>
                      
                        <Link to="/youtube-video">Youtube Video</Link>
                    </Menu.Item>

                    <Menu.Item key="2aklab111kak1" icon={<DoubleRightOutlined />}>
                        
                        <Link to="/tv-series">TV Series</Link>
                    </Menu.Item>


                    <Menu.Item key="2111111111" icon={<img src="/rupee-icon.svg" alt="payment"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/all-payments">Payments</Link>
                    </Menu.Item>

                    <Menu.Item key="211111111111" icon={<img src="/review-icon.svg" alt="samagri-review"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/samagri-review">Samagri Reviews</Link>
                    </Menu.Item>

                    <Menu.Item key="2111111111111" icon={<img src="/chat-icon.svg" alt="article-review"
                        style={{ width: 15, height: 15, filter: 'invert(100%)' }} />}>
                        <Link to="/article-feedback">Article Feedbacks</Link>
                    </Menu.Item>

                    <Menu.Item key="21111111111" icon={<QuestionCircleOutlined />}>
                        <Link to="/faq-help">Faq & Help</Link>
                    </Menu.Item>

                    <Menu.Item key="2111112" icon={<CustomerServiceOutlined />}>
                        <Link to="/support">Support</Link>
                    </Menu.Item>

                    <Menu.Item key="211111" icon={<BugOutlined />}>
                        <Link to="/bugs-report">Bugs</Link>
                    </Menu.Item>


                        {/* <Menu.SubMenu key="sub1" icon={<SettingOutlined />} title="Settings">

                            <Menu.Item key="3">Account Settings</Menu.Item>
                            <Menu.Item key="4">Privacy Settings</Menu.Item>

                        </Menu.SubMenu> */}


                </Menu>

            </div>



        </div>
    );
};

export default SidebarMenu;
