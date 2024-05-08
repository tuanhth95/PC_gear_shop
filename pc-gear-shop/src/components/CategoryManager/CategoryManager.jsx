import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import axios from 'axios';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubModalVisible, setIsSubModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleDeleteSubCategory = async (categoryId, subId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}/subcategories/${subId}`);
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete subcategory:', error);
    }
  };

  const showModal = (category = null) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const showSubModal = (category, subCategory = null) => {
    setEditingCategory(category);
    setEditingSubCategory(subCategory);
    setIsSubModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsSubModalVisible(false);
    setEditingCategory(null);
    setEditingSubCategory(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingCategory) {
        await axios.put(`/api/categories/${editingCategory._id}`, values);
      } else {
        await axios.post('/api/categories', values);
      }
      fetchCategories();
      setIsModalVisible(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Failed to submit category:', error);
    }
  };

  const handleSubFormSubmit = async (values) => {
    try {
      if (editingSubCategory) {
        await axios.put(`/api/categories/${editingCategory._id}/subcategories/${editingSubCategory._id}`, values);
      } else {
        await axios.post(`/api/categories/${editingCategory._id}/subcategories`, values);
      }
      fetchCategories();
      setIsSubModalVisible(false);
      setEditingSubCategory(null);
    } catch (error) {
      console.error('Failed to submit subcategory:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Danh mục con',
      dataIndex: 'subCategories',
      key: 'subCategories',
      render: (subCategories, record) => (
        <ul>
          {subCategories.map(sub => (
            <li key={sub._id}>
              {sub.title} 
              <Button onClick={() => showSubModal(record, sub)}>Edit</Button>
              <Button onClick={() => handleDeleteSubCategory(record._id, sub._id)} danger>Delete</Button>
            </li>
          ))}
          <Button onClick={() => showSubModal(record)}>Thêm Danh mục con</Button>
        </ul>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => showModal()}>Thêm Danh mục</Button>
      <Table columns={columns} dataSource={categories} rowKey="_id" loading={loading} />
      <Modal title={editingCategory ? 'Edit Category' : 'Add Category'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          initialValues={editingCategory || { name: '' }}
          onFinish={handleFormSubmit}
          layout="vertical"
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Nhập tên Danh mục!' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Modal title={editingSubCategory ? 'Edit SubCategory' : 'Add SubCategory'} visible={isSubModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          initialValues={editingSubCategory || { title: '', href: '' }}
          onFinish={handleSubFormSubmit}
          layout="vertical"
        >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Nhập tên Danh mục con!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Href" name="href" rules={[{ required: true, message: 'Nhập tên link Danh mục con!' }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryManager;
