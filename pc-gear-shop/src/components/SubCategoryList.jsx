import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "antd";
import { Link } from "react-router-dom";

const SubCategoryList = ({ selectedCategory }) => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(
            `/api/categories/${selectedCategory}`
          );
          setSubCategories(response.data.subCategories);
        } catch (error) {
          console.error("Error fetching sub-categories:", error);
        }
      };

      fetchSubCategories();
    }
  }, [selectedCategory]);

  return (
    <List
      dataSource={subCategories}
      renderItem={(item) => (
        <List.Item>
          <Link to={item.href}>{item.title}</Link>
        </List.Item>
      )}
    />
  );
};

export default SubCategoryList;
