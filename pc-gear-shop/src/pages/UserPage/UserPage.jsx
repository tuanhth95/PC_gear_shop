import React, { useState } from 'react';
import { Tabs } from 'antd';
import UserInfo from '../../components/UserInfor/UserInfor';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import OrderHis from '../../components/OrderHis/OrderHis';

const { TabPane } = Tabs;

const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState('userInfo');

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', marginBottom:"50px"}}>
      <Tabs activeKey={selectedTab} onChange={handleTabChange} type="card">
        <TabPane tab="Thông tin người dùng" key="userInfo">
          <UserInfo />
        </TabPane>
        <TabPane tab="Thay đổi mật khẩu" key="changePassword">
          <ChangePassword />
        </TabPane>
        <TabPane tab="Lịch sử đơn hàng" key="orderHistory">
          <OrderHis />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserPage;
