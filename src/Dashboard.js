import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SearchOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import AddNewHome from './AddNewHome';
import SearchHomes from './SearchHomes';
import RentedHomes from './RentedHomes';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('4');

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '4':
        return <AddNewHome />;
      case '5':
        return <SearchHomes />;
      case '6':
        return <RentedHomes />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          selectedKeys={[selectedKey]}
          onClick={onMenuClick}
          items={[
            {
              key: '4',
              icon: <HomeOutlined />,
              label: 'Add New Home',
            },
            {
              key: '5',
              icon: <SearchOutlined />,
              label: 'Search Homes',
            },
            {
              key: '6',
              icon: <AppstoreOutlined />,
              label: 'Rented/Sold Homes',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#fff',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
