import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Flex, List, Input, Button,  } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined, CloseOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import * as CartService from '../../services/CartService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import { retry } from '@reduxjs/toolkit/query';

const CartPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [datas, setDatas] = useState([]);

  const fetchApi = async (temp) => {
    let response = await axios.get(`${process.env.REACT_APP_API_CART}?all=true`, temp);
    console.log("response.data: ",response.data.data);
    setDatas(response.data.data);
    setQuantity(datas.length);
    return response.data.data;
  }

  const {status, data, error} = useQuery({queryKey: ['get-api'], queryFn: fetchApi, retry:2, retryDelay: 500})
  const mutation = useMutation({mutationKey : ['mutation-put'],mutationFn: (change) => {
    return axios.put(`${process.env.REACT_APP_API_CART}/${change.id}?sl=${change.sl}`)
  }, onSuccess: (data) => { 
    let temp = datas.filter(e => e.productID === data.data.data.productID)[0];
    let newData = datas;
    newData.forEach(e => {if (e.productID === data.data.data.productID) e.quantity = data.data.data.id;})
    //console.log("data return: ", newData);
    setDatas(newData);
  }})
  const mutationDelete = useMutation({mutationKey: ['mutation-delete'], mutationFn: (id) => {
    return axios.delete(`${process.env.REACT_APP_API_CART}/${id}`)
  }, 
  onSuccess:(data) => {
    console.log("data return: ",data.data.data.id);
    let newData = datas.filter(e => e.productID !== data.data.data.id);
    console.log("new data: ", newData, "   len: ", quantity);
    setDatas(newData); 
    setQuantity(newData.length);
  }})

  const handleChangeMutation = (change) => {
    mutation.mutate(change);
  }
  
  const onDelete = (id) =>{
    mutationDelete.mutate(id);
  }

  if(status === "success")
  return (
    <div style={{width: '800px', margin:'auto', marginTop:'50px'}}>
      <List
        size="large"
        header={<div>Giỏ hàng</div>}
        bordered
        dataSource={datas}
        renderItem={(item, index) => <List.Item><ProductListCard data = {{item, index, onDelete, handleChangeMutation, onDelete}}></ProductListCard></List.Item>}
      />
    </div>
  );
  else return (<div style={{fontSize:"60px"}}>{status}</div>)
}
class ProductListCard extends React.Component{
  state = {
    quantity: this.props.data.item.quantity
  }

  handleOnChange = (e,id) => {
    console.log(e.target.value);
    this.props.data.handleChangeMutation({id:id, sl:Number(e.target.value)});;;
    this.setState({quantity: e.target.value})
  }

  render(){
    const {productID : id, image, name, quantity, price} = this.props.data.item;
    const index = this.props.data.index;
    const onDelete = this.props.data.onDelete;
    const onChange = this.props.data.handleChangeMutation;
    return(
      <Flex align='center' justify="space-around" horizontal="true" gap="middle">
        <div><img src={image} style={{width: '160px', height: 'auto'}}/></div>
        <div>{name}</div>
        <div style={{ height:"inherit",display:'flex', flexDirection:"row", alignItems:"center", gap:"16px", flexGrow:"0", }}>
          <Button type="primary" icon={<CaretLeftOutlined />} onClick={() => {this.setState({quantity:this.state.quantity - 1}); onChange({id:id, sl:this.state.quantity - 1})}} size="middle" />
          <Input placeholder="Outlined" value={this.state.quantity} onChange={(e) => this.handleOnChange(e,id)} style={{boxSizing:"content-box", width:"50px", flexGrow:"0"}}/>
          <Button type="primary" icon={<CaretRightOutlined />} onClick={() => {this.setState({quantity:this.state.quantity + 1}); onChange({id:id, sl:this.state.quantity + 1})}} size="middle" />
        </div>
        <div style={{color:"red", fontWeight:"500"}}>{price}</div>
        <Button type="primary" icon={<CloseOutlined/>} size="middle" danger onClick={() => {onDelete(id)}}/>
      </Flex>
    );
  }
}
export default CartPage;
