import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Sidebar = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
      {categories.map((category) => (
        <SubMenu key={category.name} title={category.name}>
          {category.subCategories.map((subCategory) => (
            <Menu.Item key={subCategory.title}>
              <Link to={subCategory.href}>{subCategory.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default Sidebar;
