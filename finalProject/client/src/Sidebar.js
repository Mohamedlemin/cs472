
import React from 'react';
import { Menu } from 'antd';
import { BookOutlined, SearchOutlined } from '@ant-design/icons';

const Sidebar = () => {
  return (
    <Menu
      style={{ width: 256, height: '100vh' }}
      defaultSelectedKeys={['1']}
      mode="inline"
      theme="dark"
    >
      <Menu.Item key="1" icon={<SearchOutlined />}>
        Search
      </Menu.Item>
      <Menu.Item key="2" icon={<BookOutlined />}>
        Popular Terms
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;