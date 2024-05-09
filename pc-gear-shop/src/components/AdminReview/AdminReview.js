import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Input, Rate, Modal, message, notification, DatePicker  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios'; 
import moment from 'moment';

import { WrapperHeader } from './style';
const { MonthPicker } = DatePicker;

const formatDate= (date) =>{
  const dateObject = new Date(date);
  const day = String(dateObject.getUTCDate()).padStart(2, '0');
  const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const year = dateObject.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

const AdminReview = () => {
  const [data, setData] = useState([]);
  
  const [id, setId] = useState();
  const [api, contextNoti] = notification.useNotification();
  const [open, setOpen] = useState(false);

  const getAllReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/review/get-all-review`);
      const reviewsWithUserInfo = response.data.map((review) => ({
        ...review,
        replies: review.replies.map((reply) => ({
          ...reply,
          userNameReply: reply.userNameReply,
        })),
      }));
      return reviewsWithUserInfo;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    getAllReviews().then(setData);
  }, []); 

  const queries = useQueries({
    queries: [
      {queryKey: ['reviews'], queryFn: getAllReviews, staleTime: 1000 * 60}
    ]
  })

  const handleDelete = (review_id) => {
    setOpen(true);
    setId(review_id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/review/${id}`);
      console.log('Xóa đánh giá thành công', response.data);  
      const updatedReviews = await getAllReviews();
      setData(updatedReviews);  
      setOpen(false);
  
      const key = `open${Date.now()}`;
      notification.open({
        message: 'Thông báo',
        description: 'Một đánh giá đã được xoá thành công',
        btn: (
          <Space>
            <Button type="link" size="small" onClick={() => notification.destroy(key)}>
              Đóng
            </Button>
          </Space>
        ),
        key: key,
        onClose: () => console.log('Notification closed'),
      });
    } catch (error) {
      console.error('Error deleting review:', error);
    }
    
  };


  const handleDeleteReply = async (reviewID, replyID) => {
    try {
      Modal.confirm({
        title: 'Xác nhận xoá',
        content: 'Bạn có chắc chắn muốn xoá câu trả lời này không?',
        okText: 'Xoá',
        cancelText: 'Hủy',
        onOk: async () => {
          const response = await axios.delete(`http://localhost:3001/api/review/${reviewID}/reply/${replyID}`);
          console.log('Xóa trả lời thành công', response.data);  
  
          const updatedReviews = await getAllReviews();
          setData(updatedReviews);  
  
          const key = `open${Date.now()}`;
          notification.open({
            message: 'Thông báo',
            description: 'Một câu trả lời đã được xoá thành công',
            btn: (
              <Space>
                <Button type="link" size="small" onClick={() => contextNoti.destroy(key)}>
                  Đóng
                </Button>
              </Space>
            ),
            key: key,
            // onClose: () => console.log(''),
          });
        },
        onCancel: () => {
          console.log('Hủy xóa');
        },
      });
    } catch (error) {
      console.error('Lỗi xóa đánh giá:', error);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
      if (dataIndex === 'date') {
        return (
          <div style={{ padding: 8 }}>
            <MonthPicker
              value={selectedKeys[0] ? moment(selectedKeys[0], 'MM-YYYY') : null}
              format="MM-YYYY"
              onChange={(date, dateString) => setSelectedKeys(dateString ? [dateString] : [])}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                }}
                size="small"
                style={{ width: 90 }}
              >
                OK
              </Button>
              <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        );
      } else {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  confirm();
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  clearFilters();
                  confirm();
                }}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      }
    },
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'date') {
        const recordDate = moment(record[dataIndex]);
        return recordDate.format('MM-YYYY') === value;
      } else {
        return record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase());
      }
    },
  });


  const columns = [
    {
      title: 'Ngày đánh giá',
      dataIndex: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => (date ? formatDate(new Date(date).toLocaleDateString()) : 'Unknown date'),
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Người đánh giá',
      dataIndex: 'userName',
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'productName',
      ...getColumnSearchProps('productName'),
    },
    {
      title: 'Số sao đánh giá',
      dataIndex: 'rate',
      width: '180px',
      sorter: (a, b) => a.rate - b.rate,
      render: (rate) => (rate ?  <Rate value={rate} disabled/> : 'Không có đánh giá'),
      filters: [ 
        { text: '1 sao', value: 1 },
        { text: '2 sao', value: 2 },
        { text: '3 sao', value: 3 },
        { text: '4 sao', value: 4 },
        { text: '5 sao', value: 5 },
      ],
      onFilter: (value, record) => record.rate === value, 
      filterMultiple: false, 
    },
    {
      title: 'Nội dung đánh giá',
      dataIndex: 'contentReview',
      ...getColumnSearchProps('contentReview'),
    },
    {
      title: 'Số câu trả lời đánh giá',
      dataIndex: 'replies',
      width: '180px',
      render: (replies) => (replies.length > 0 ? 
      <div>
      {replies.length}
      {/* <Button style={{marginLeft: '10px'}} onClick={() => handleReplyDetail(record._id)}>Xem chi tiết</Button> */}
      </div> : 'Không có câu trả lời cho đánh giá này'),
    },
    {
      title: 'Thao tác',
      dataIndex: '_id',
      render: (_id) => (
        <div style={{display: 'inline-flex'}}>
          {/* <Button onClick={handleOpenReplyModal()}>Trả lời</Button> */}
          <Button style={{ marginLeft: '10px' }} onClick={() => handleDelete(_id)}>Xóa</Button>
        </div>
      )
    }
    
  ];

  const formattedData = data?.length && data?.map((review) => {
    return { ...review, key: review._id}
  })

  const [expandedReviewKeys, setExpandedReviewKeys] = useState([]);
  const handleRowExpand = (expanded, record) => {
    if (expanded) {
      setExpandedReviewKeys([...expandedReviewKeys, record.key]);
    } else {
      setExpandedReviewKeys(expandedReviewKeys.filter(key => key !== record.key));
    }
  };
  
  const expandedRowRender = (record) => {
    if (expandedReviewKeys.includes(record.key)) { 
      if (record.replies.length > 0) {
        const columns = [
          { title: 'Người trả lời', dataIndex: 'userNameReply', key: 'userNameReply' },
          { title: 'Nội dung', dataIndex: 'content', key: 'content' },
          { title: 'Ngày trả lời', dataIndex: 'date', render: (date) => (date ? formatDate(new Date(date).toLocaleDateString()) : 'Unknown date'), key: 'date' },
          { title: 'Thao tác', dataIndex: '_id',
          render: (_id) => (
            <div>
              <Button style={{ marginLeft: '10px' }} onClick={() => handleDeleteReply(record._id,_id)}>Xóa</Button>
            </div>
          )}

        ];
  
        return (
          <Table
            columns={columns}
            dataSource={record.replies}
            pagination={false}
          />
        );
      } else {
        return <div>Không có câu trả lời cho đánh giá này</div>; 
      }
    }
  };

  
  return (
    <div>
      <WrapperHeader>Quản lý đánh giá</WrapperHeader>
      <Table
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={formattedData}
        pagination={{ pageSize: 10 }}
        expandable={{
          expandedRowKeys: expandedReviewKeys, 
          onExpand: handleRowExpand,
        }}
      />
      <Modal
        open={open}
        title="Title"
        onOk={handleYes}
        onCancel={handleClose}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <OkBtn />
            <CancelBtn />
          </>
        )}
      >
        Bạn có chắc chắn muốn xóa đánh giá này không?
      </Modal>
      
    </div>
  );
};

export default AdminReview;

