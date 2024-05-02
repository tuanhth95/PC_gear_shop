import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css"; // or 'antd/dist/antd.less'
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import SubCategoryList from "./components/SubCategoryList";
import AppHeader from "./components/AppHeader";
import AppFooter from './components/AppFooter';
import "./index.css";

const { Content, Header  } = Layout;

const App = () => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  // Lấy danh sách các danh mục từ server khi component được mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Khi danh mục được chọn thay đổi, cập nhật danh sách các danh mục con
    const category = categories.find(c => c.name === selectedCategory);
    setSubCategories(category ? category.subCategories : []);
  }, [selectedCategory, categories]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader categories={categories} />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          {/* Nếu một danh mục được chọn, hiển thị danh sách các danh mục con */}
          {selectedCategory && <SubCategoryList subCategories={subCategories} />}
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};
export default App;
