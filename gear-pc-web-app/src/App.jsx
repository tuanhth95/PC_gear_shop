import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css"; // or 'antd/dist/antd.less'
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import SubCategoryList from "./components/SubCategoryList";

const { Content, Sider } = Layout;

const App = () => {
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
    if (selectedCategory) {
      const category = categories.find((c) => c.name === selectedCategory);
      setSubCategories(category ? category.subCategories : []);
    }
  }, [selectedCategory, categories]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
        <Sidebar
          categories={categories}
          onCategoryChange={setSelectedCategory}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* Chỉ hiển thị SubCategoryList nếu có subCategories */}
          {subCategories.length > 0 && (
            <SubCategoryList subCategories={subCategories} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
