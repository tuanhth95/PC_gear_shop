import React, { useState } from "react";
import { Layout, Menu, Dropdown, Button, Input } from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct as searchProductAction } from "../../redux/slices/productSlice";

const { Header } = Layout;

const AppHeader = ({ categories }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearch = (value) => {
    if (!value.trim()) return;
    dispatch(searchProductAction(value));
    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  // Navigate to cart page
  const goToCart = () => {
    navigate("/cart");
  };

  // Navigate to sign-in page
  const goToSignIn = () => {
    navigate("/SignIn"); // Ensure the path is correct as per your routing configuration
  };

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
    <Header
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo"> </div>
      <Dropdown overlay={categoryMenu} trigger={["click"]} style={{ flex: 1 }}>
        <Button>
          <MenuOutlined />
          Danh mục
        </Button>
      </Dropdown>
      <Input.Search
        style={{ flex: 2 }}
        placeholder="Bạn cần tìm gì?"
        value={search}
        onChange={onChange}
        onSearch={onSearch}
        enterButton
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          icon={<ShoppingCartOutlined />}
          onClick={goToCart}
          style={{ fontSize: "16px", padding: "0 12px" }}
        >
          Giỏ hàng
        </Button>
        <Button
          onClick={goToSignIn}
          style={{ fontSize: "16px", padding: "0 12px" }}
        >
          <UserOutlined />
          Đăng nhập
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;
