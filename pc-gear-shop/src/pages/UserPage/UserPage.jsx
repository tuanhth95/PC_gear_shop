import React, { useState } from 'react';
import { Tabs, message, Button } from 'antd';
import UserInfo from '../../components/UserInfor/UserInfor';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import OrderHis from '../../components/OrderHis/OrderHis';
import * as UserService from '../../services/UserService'
// import { useDispatch } from 'react-redux';
// import { updateUser } from '../../redux/slices/userSlide';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

const UserPage = () => {
  const [selectedTab, setSelectedTab] = useState('userInfo');
  
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true); 

  const handleLogout = async () => {
    try {
      await UserService.logoutUser(); 
      setIsLoggedIn(false);
      
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
  if (!isLoggedIn) {
    return window.location.href = '/SignIn';
  }
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
        <TabPane>
          <Button type="primary" onClick={handleLogout}>Đăng xuất</Button>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserPage;

// import React from 'react';
// import { useSelector } from 'react-redux';

// const UserPage = () => {
//   // Sử dụng useSelector để lấy dữ liệu user từ Redux store
//   const user = useSelector(state => state.user);

//   // Sử dụng dữ liệu user ở đây
//   console.log(user);

//   return (
//     <div>
//       {/* Hiển thị thông tin user */}
//       <p>id: {user.id}</p>
//       <p>Tên: {user.name}</p>
//       <p>Email: {user.email}</p>
//       {/* và các thông tin khác */}
//     </div>
//   );
// };

// export default UserPage;
