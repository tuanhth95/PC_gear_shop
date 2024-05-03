import React from 'react';
import { Layout, Menu, Dropdown, Button, Input } from 'antd';
import {
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ categories }) => {
  // Tạo menu dropdown cho danh mục
  const categoryMenu = (
    <Menu>
      {categories.map((category) => (
        <Menu.SubMenu key={category._id} title={category.name}>
          {category.subCategories.map((subCategory) => (
            <Menu.Item key={subCategory._id}>
              <a href={subCategory.href}>{subCategory.title}</a>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo">   </div>
      <Dropdown overlay={categoryMenu} trigger={['click']}>
        <Button>
        <MenuOutlined />
          Danh mục
        </Button>
      </Dropdown>
      <Input placeholder="Bạn cần tìm gì?" prefix={<SearchOutlined />} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button icon={<ShoppingCartOutlined />} />
        <Button icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;
