// src/App.js
import React from 'react';
import { Layout } from 'antd';
import MainContent from './MainContent';
import AppFooter from './Footer';
import Sidebar from './Sidebar';
import { Typography } from 'antd';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;


function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <Sider width={200} style={{ background: '#fff' }}>
        <Sidebar />
      </Sider> */}
      <Layout>
        {/* <Header style={{ background: '#fff', padding: 0 }}>
         
        </Header> */}
        <Content style={{ margin: '24px 16px 0' }}>
          <MainContent />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default App;