import React, { useEffect, useRef, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { Button, Form, Select, Space } from 'antd'
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from '../Message/Message'
import { useQuery } from "@tanstack/react-query";
import { renderOptions } from '../../utils'
import * as ProductService from '../../services/ProductService'
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct = () =>
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const user = useSelector((state) => state?.user)
    const initial = () => ({
        id: '',
        name: '',
        img: '',
        type: '',
        price: '',
        discount: '',
        description: '',
        newType: ''
      })
    const [stateProduct, setStateProduct] = useState(initial())

    const [stateProductDetails, setStateProductDetails] = useState(initial())
    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
          const {      
          id,
          name,
          img,
          type,
          price,
          discount,
          description } = data
          const res = ProductService.createProduct({
            id,
            name,
            img,
            type,
            price,
            discount,
            description
          })
          return res
        }
    )

    const mutationUpdate = useMutationHooks(
        (data) => {
          const { _id,
            token,
            ...rests } = data
          const res = ProductService.updateProduct(
            _id,
            token,
            { ...rests })
          return res
        },
      )

    const mutationDeleted = useMutationHooks(
        (data) => {
          const { id,
            token,
          } = data
          const res = ProductService.deleteProduct(
            id,
            token)
          return res
        },
      )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
          const { token, ...ids
          } = data
          const res = ProductService.deleteManyProduct(
            ids,
            token)
          return res
        },
      )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
      }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
            id: res?.data?.id,
            name: res?.data?.name,
            price: res?.data?.price,
            description: res?.data?.description,
            img: res?.data?.img,
            type: res?.data?.type,
            discount: res?.data?.discount
          })
        }
        setIsLoadingUpdate(false)
      }
    
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
      }
  
    useEffect(() => {
        if(!isModalOpen) {
          form.setFieldsValue(stateProductDetails)
        }else {
          form.setFieldsValue(initial())
        }
      }, [form, stateProductDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
          setIsLoadingUpdate(false) 
          fetchGetDetailsProduct(rowSelected)
        }
      }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleDeleteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
      }

    const { data, isLoading, isSuccess, isError } = mutation
    const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate
    const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted 
    const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeletedMany
    const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
    const {isLoading: isLoadingProducts, data: products} = queryProduct
    const renderAction = () => {
        return (
          <div>
            <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
            <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
          </div>
        )
      }
    
      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
          <div
            style={{
              padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <InputComponent
              ref={searchInput}
              placeholder={`Nhập ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Tìm
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Đặt lại
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  close();
                }}
              >
                Đóng
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1677ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      });

      const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          sorter: (a,b) => a.id - b.id,
          ...getColumnSearchProps('id')
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          sorter: (a,b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name'),
        },
        {
          title: 'Loại sản phẩm',
          dataIndex: 'type',
          sorter: (a,b) => a.type.length - b.type.length,
          ...getColumnSearchProps('type')
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          sorter: (a,b) => a.price - b.price,
          filters: [
            {
              text: '<=1tr',
              value: '<=1',
            },
            {
              text: '1tr - 5tr',
              value: '1-5',
            },
            {
              text: '5tr - 10tr',
              value: '5-10',
            },
            {
              text: '10tr - 20tr',
              value: '10-20',
            },
            {
              text: '20tr - 30tr',
              value: '20-30',
            },
            {
              text: '>= 30tr',
              value: '>=30',
            },
          ],
          onFilter: (value, record) => {
            if(value === '<=1')
            {
              return record.price <= 1000000
            }
            else if(value === '1-5')
            {
              return record.price >= 1000000 && record.price <= 5000000
            }
            else if(value === '5-10')
            {
              return record.price >= 5000000 && record.price <= 10000000
            }
            else if(value === '10-20')
            {
              return record.price >= 10000000 && record.price <= 20000000
            }
            else if(value === '20-30')
            {
              return record.price >= 20000000 && record.price <= 30000000
            }
            else{
              return record.price >= 30000000
            }
          }
        },
        {
          title: 'Giảm giá',
          dataIndex: 'discount',
          sorter: (a,b) => a.discount - b.discount,
          filters: [
            {
              text: '<=10%',
              value: '<=10',
            },
            {
              text: '10%-20%',
              value: '10-20',
            },
            {
              text: '20%-30%',
              value: '20-30',
            },
            {
              text: '30%-40%',
              value: '30-40',
            },
            {
              text: '40% - 50%',
              value: '40-50',
            },
            {
              text: '>=50%',
              value: '>=50',
            },
          ],
          onFilter: (value, record) => {
            if(value === '<=10')
            {
              return record.discount <= 10
            }
            else if(value === '10-20')
            {
              return record.discount >=10 && record.discount <= 20
            }
            else if(value === '20-30')
            {
              return record.discount >=20 && record.discount <= 30
            }
            else if(value === '30-40')
            {
              return record.discount >=30 && record.discount <= 40
            }
            else if(value === '40-50')
            {
              return record.discount >=40 && record.discount <= 50
            }
            else{
              return record.discount >= 50
            }
          }
        },
        {
          title: '',
          dataIndex: 'action',
          render: renderAction
        },
      ];
    
      const dataTable = products?.data?.map(product => ({ ...product, key: product._id }));

    
    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
          message.success()
          handleCancel()
        } else if (isError) {
          message.error()
        }
      }, [isSuccess])

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
          message.success()
        } else if (isErrorDeletedMany) {
          message.error()
        }
      }, [isSuccessDeletedMany])

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
          message.success()
          handleCancelDelete()
        } else if (isErrorDeleted) {
          message.error()
        }
      }, [isSuccessDeleted])
    
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
      }

    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
    }
    
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
          id:'',
          name: '',
          img: '',
          type: '',
          price: '',
          discount: '',
          description: ''      })
        form.resetFields()
      };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
          message.success()
          handleCloseDrawer()
        } else if (isErrorUpdated) {
          message.error()
        }
      }, [isSuccessUpdated])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            id: '',
            name: '',
            img: '',
            type: '',
            price: '',
            discount: '',
            description: ''
        })
        form.resetFields()
      };

    const onFinish = () => {
        const params = {
          id: stateProduct.id,
          name: stateProduct.name,
          price: stateProduct.price,
          description: stateProduct.description,
          img: stateProduct.img,
          type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
          discount: stateProduct.discount
        }
        mutation.mutate(params, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
      }
    
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name] : e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name] : e.target.value
        })
    }
  
    const onUpdateProduct = () => {
        mutationUpdate.mutate({ _id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
          onSettled: () => {
            queryProduct.refetch()
          }
        })
      }

    const handleChangeSelect = (value) => {
        setStateProduct({
          ...stateProduct,
          type: value
        })
    }

    const renderDescriptionInputs = (description) => {
      if (typeof description === 'object' && description !== null) {
          return Object.entries(description).map(([key, value], index) => (
              <Form.Item
                  key={index}
                  label={key}
                  name={`description.${key}`}
              >
                  <InputComponent defaultValue={value} />
              </Form.Item>
          ));
      } else {
          return (
              <Form.Item
                  label="Chi tiết"
                  name="description"
              >
                  <InputComponent defaultValue={description} />
              </Form.Item>
          );
      }
  };
  
    
    const handleFileUpload = async (files, isDetail = false) => {
      if (!files || files.length === 0) {
          console.error('No file selected for upload.');
          message.error('Please select a file to upload.');
          return;
      }
  
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      let imageUrl = null
  
      try {
          const response = await fetch('http://localhost:3001/api/img/upload', {
              method: 'POST',
              body: formData,
          });

          const data = await response.json();
        imageUrl = data.secure_url;
        const nameImg = file.name
        const responseAdd = await fetch(`http://localhost:3001/api/img`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: imageUrl,
            filename: nameImg
          }),
        });
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          if (data && data.secure_url) {
              if (isDetail) {
                  setStateProductDetails(prevState => ({
                      ...prevState,
                      img: data.secure_url
                  }));
              } else {
                  setStateProduct(prevState => ({
                      ...prevState,
                      img: data.secure_url
                  }));
              }
              message.success('Image uploaded successfully!');
          } else {
              throw new Error('No URL returned from server');
          }
      } catch (error) {
          console.error('Error uploading image:', error);
          message.error(error.message || 'Failed to upload image.');
      }
  };
  

return(
      <div style={{margin: '20px 100px'}}>
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop: '10px'}}>
                <Button style={{ height: '50px', width: '50px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '20px' }} /></Button>
            </div>
            <div style={{ marginTop: '20px' }}>
            <TableComponent handleDeleteMany={handleDeleteManyProducts} isLoading={isLoadingProducts} columns = {columns} data={dataTable}
            onRow={(record, rowIndex) => {
            return {
              onClick: event => {
              setRowSelected(record._id)
            }
            };
            }} 
            />
      </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
            {/* <Loading isLoading={isLoading}> */}
            <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            autoComplete="on"
            form={form}
            >
                <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Vui lòng nhập id sản phẩm!' }]}
                >
                <InputComponent value={stateProduct['id']} onChange={handleOnchange} name="id" />
                </Form.Item>
                <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
                >
                <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
                </Form.Item>

                <Form.Item
                label="Loại"
                name="type"
                rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                >
                <Select
                name="type"
                value={stateProduct.type}
                onChange={handleChangeSelect}
                options={renderOptions(typeProduct?.data?.data)}
                />
                </Form.Item>
                {stateProduct.type === 'add_type' && (
                <Form.Item
                label='Loại mới'
                name="newType"
                rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
                >
                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                </Form.Item>
                )}
                <Form.Item
                label="Giá"
                name="price"
                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
                >
                <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                </Form.Item>
                <Form.Item
                label="Chi tiết"
                name="description"
                rules={[{ required: true, message: 'Vui lòng nhập chi tiết sản phẩm!' }]}
                >
                <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                </Form.Item>
                <Form.Item
                label="Giảm giá"
                name="discount"
                rules={[{ required: true, message: 'Vui lòng nhập giảm giá của sản phẩm!' }]}
                >
                <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
                </Form.Item>
            <Form.Item label="Hình ảnh" name="img">
            <input
            type="file"
            onChange={(e) => handleFileUpload(e.target.files)}
            accept="image/*" 
            />
            {stateProduct.img && (
            <img src={stateProduct.img} alt="Product" style={{ width: '100px', height: '100px' }} />
            )}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item> 
            </Form>           
            {/* </Loading> */}
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="75%">
        {/* <Loading isLoading={isLoadingUpdate || isLoadingUpdated}> */}

          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
                label="ID"
                name="id"
                rules={[{ required: true, message: 'Vui lòng nhập id sản phẩm!' }]}
                >
                <InputComponent value={stateProductDetails['id']} onChange={handleOnchangeDetails} name="id" />
                </Form.Item>
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Loại"
              name="type"
              rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails} name="price" />
            </Form.Item>
            {stateProductDetails.description && renderDescriptionInputs(stateProductDetails.description)}
            <Form.Item
              label="Giảm giá"
              name="discount"
              rules={[{ required: true, message: 'Vui lòng nhập giảm giá của sản phẩm!' }]}
            >
              <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
            </Form.Item>
            <Form.Item label="Hình ảnh" name="img">
            <input
                type="file"
                onChange={(e) => handleFileUpload(e.target.files, true)}
                accept="image/*"
            />
            {stateProductDetails.img && (
                <img src={stateProductDetails.img} alt="Product" style={{ width: '100px', height: '100px' }} />
            )}
        </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        {/* </Loading> */}
      </DrawerComponent>
      <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        {/* <Loading isLoading={isLoadingDeleted}> */}
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        {/* </Loading> */}
      </ModalComponent>
        </div>
    </div>
    )
}

export default AdminProduct;

