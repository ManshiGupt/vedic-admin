import React from 'react';
import { Layout } from 'antd';
import SidebarMenu from './sidebar-menu';
import TopMenuBar from './top-menu'
import { Outlet } from 'react-router-dom';;

const { Header, Sider, Content } = Layout;

const AppLayout = () => {

    return (
        <Layout style={{ minHeight: '98vh' }}>

            <Sider width="240">
                <SidebarMenu />
            </Sider>

            <Layout>

                <Header>
                    <TopMenuBar />
                </Header>

                <Content style={{marginLeft: '20px', marginRight: '20px'}}>
                    <Outlet />
                </Content>

            </Layout>


        </Layout>
    );
};

export default AppLayout;