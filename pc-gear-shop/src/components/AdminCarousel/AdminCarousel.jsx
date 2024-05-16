import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Tabs, Select } from 'antd';
const { TabPane } = Tabs;

const AdminCarousel = () => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchColumn, setSearchColumn] = useState('filename');

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [editingImage, setEditingImage] = useState(null);
  const [editedFilename, setEditedFilename] = useState('');
  const [editedUrl, setEditedUrl] = useState('');
  const [activeTab, setActiveTab] = useState('url');
  const [deletingImageId, setDeletingImageId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/carousel/get-all');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (record) => {
    setEditingImage(record);
    setEditedFilename(record.filename);
    setEditedUrl(record.url);
    setIsEditModalVisible(true);
  };

  const handleFileUpload = async (files) => {
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await fetch('http://localhost:3001/api/carousel/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      const imageUrl = data.secure_url;
      setEditedUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async () => {
    //let files = document.getElementById('uploadInput').files;
    let imageUrl = null;
    try {
      if (activeTab === 'url') {
        let requestBody = {
          filename: editedFilename,
          url: editedUrl
        };
        await fetch(`http://localhost:3001/api/carousel/update/${editingImage._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } else if (activeTab === 'upload') {
        let files = document.getElementById('uploadInput').files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const response = await fetch('http://localhost:3001/api/carousel/upload', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        imageUrl = data.secure_url;
        let requestBody = {
          filename: editedFilename,
          url: imageUrl
        };
        await fetch(`http://localhost:3001/api/carousel/update/${editingImage._id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      }
  
      const updatedImages = images.map(image => {
        if (image._id === editingImage._id) {
          return {
            ...image,
            filename: editedFilename,
            url: activeTab === 'upload' ? imageUrl : editedUrl,
          };
        }
        return image;
      });
  
      setImages(updatedImages);
      setIsEditModalVisible(false);
      setEditedUrl('');
      setEditedFilename('');
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    setEditedUrl('');
    setEditedFilename('');
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleDelete = (record) => {
    setDeletingImageId(record._id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:3001/api/carousel/delete/${deletingImageId}`, {
        method: 'DELETE',
      });
      const updatedImages = images.filter(image => image._id !== deletingImageId);
      setImages(updatedImages);
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleCancelDelete = () => {
    setDeletingImageId(null);
    setIsDeleteModalVisible(false);
  };

  const handleAddNewImage = () => {
    setIsAddModalVisible(true);
  };

  const handleAdd = async () => {
    try {
      let imageUrl = null;
      if (activeTab === 'url') {
        const response = await fetch(`http://localhost:3001/api/carousel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: editedUrl,
            filename: editedFilename
          }),
        });
        const data = await response.json();
        const updatedImages = [...images, data];
        setImages(updatedImages);
        //setIsAddModalVisible(false);
      } else if (activeTab === 'upload') {
        // Xử lý thêm từ việc upload từ trình duyệt
        let files = document.getElementById('uploadInput').files;
        const formData = new FormData();
        formData.append('file', files[0]);
        const response = await fetch('http://localhost:3001/api/carousel/upload', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        imageUrl = data.secure_url;
        const responseAdd = await fetch(`http://localhost:3001/api/carousel`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: imageUrl,
            filename: editedFilename
          }),
        });
        const addedData = await responseAdd.json();
        const updatedImages = [...images, addedData];
        setImages(updatedImages);
        //setIsAddModalVisible(false);
      }
      setIsAddModalVisible(false);
      setEditedUrl('');
      setEditedFilename('');
    } catch (error) {
      console.error('Error adding new image:', error);
    }
    finally {
      setIsAddModalVisible(false);
      setEditedUrl('');
      setEditedFilename('');
    }
  };
  
  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchColumnChange = (value) => {
    setSearchColumn(value);
  };

  const filteredImages = images.filter(image => {
    if (searchColumn === 'filename') {
      return image.filename.toLowerCase().includes(searchText.toLowerCase());
    } else if (searchColumn === '_id') {
      return image._id.toLowerCase().includes(searchText.toLowerCase());
    }
    return true;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      width: 200,
    },
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
      width: 150,
    },
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      width: 100,
    },
    {
      title: 'Content Type',
      dataIndex: 'contentType',
      key: 'contentType',
      width: 100,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: 'Source',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (text) => <img src={text} alt="image" style={{ width: '150px', height: '60px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 20%' }}>
        <div>
          <Input.Group compact>
            <Select defaultValue="filename" style={{ width: 120 }} onChange={handleSearchColumnChange}>
              <Select.Option value="filename">Filename</Select.Option>
              <Select.Option value="_id">ID</Select.Option>
            </Select>
            <Input.Search
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchTextChange}
              style={{ width: 200 }} />
          </Input.Group>
        </div>
        <div>
          <Button type="primary" onClick={handleAddNewImage}>Add</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={filteredImages} />
      <Modal
        title="Edit Image"
        visible={isEditModalVisible}
        onOk={handleSave}
        onCancel={handleCancelEdit}>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="URL" key="url">
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="editedUrl">URL:</label>
              <Input
                id="editedUrl"
                value={editedUrl}
                onChange={(e) => setEditedUrl(e.target.value)}
                placeholder="URL"
              />
            </div>
          </TabPane>
          <TabPane tab="Upload" key="upload">
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="uploadInput">Upload Image:</label>
              <input
                id="uploadInput"
                type="file"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
          </TabPane>
        </Tabs>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="editedFilename">Filename:</label>
          <Input
            id="editedFilename"
            value={editedFilename}
            onChange={(e) => setEditedFilename(e.target.value)}
            placeholder="Filename"
          />
        </div>
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}>Bạn có chắc chắn muốn xoá tấm ảnh này?
      </Modal>
      <Modal
  title="Add New Image"
  visible={isAddModalVisible}
  onOk={handleAdd}
  onCancel={handleCancelAdd}
>
  <Tabs activeKey={activeTab} onChange={handleTabChange}>
    <TabPane tab="URL" key="url">
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="addImageUrl">URL:</label>
        <Input
          id="addImageUrl"
          value={editedUrl}
          onChange={(e) => setEditedUrl(e.target.value)}
          placeholder="URL"
        />
      </div>
    </TabPane>
    <TabPane tab="Upload" key="upload">
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="uploadInput">Upload Image:</label>
        <input
          id="uploadInput"
          type="file"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>
    </TabPane>
  </Tabs>
  <div style={{ marginBottom: 16 }}>
    <label htmlFor="addImageFilename">Filename:</label>
    <Input
      id="addImageFilename"
      value={editedFilename}
      onChange={(e) => setEditedFilename(e.target.value)}
      placeholder="Filename"
    />
  </div>
</Modal>
    </div>
  );
};

export default AdminCarousel;