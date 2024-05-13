
import React, { useState, useEffect } from 'react';
import { GroupedProducts, GroupedProductsTitle } from './style';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import MainCarousel from '../../components/MainCarousel/MainCarousel';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider'
import { Button, Modal } from 'antd';
import ChatBox from '../../components/ChatBox/Chatbox';
import {WechatOutlined} from '@ant-design/icons';
import "../../components/ChatBox/chatstyle.css"


const HomePage = () => {
  const [slides, setSlides] = useState();
  const [laptopList, setLaptopList] = useState();
  const [gamingList, setGamingList] = useState();
  const [pcGVNList, setPcGVNList] = useState();
  const [screenList, setScreenList] = useState();
  const [keyboardList, setKeyboardList] = useState();
  const [mouseList, setMouseList] = useState();
  

  const fetchAllProductsHome = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/product_detail/get-all`
    );
    // console.log( typeof res.data.data)
    return res.data;
  };

  const fetchAllSlidesHome = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/main_carousel/get-slides"
    );
    return response.data;
  };

  const { data: allProductsHome } = useQuery({
    queryKey: ["allProductsHome"],
    queryFn: fetchAllProductsHome,
  });

  const { data: allSlidesHome } = useQuery({
    queryKey: ["allSlidesHome"],
    queryFn: fetchAllSlidesHome,
    retry:3,
    retryDelay:1000,
  });

  useEffect(() => {
    if (allProductsHome) {
      // console.log(allProductsHome.data)
      const groupedArrays = allProductsHome.data.reduce(
        (result, currentItem) => {
          const type = currentItem.type;
          if (!result[type]) {
            result[type] = [];
          }
          result[type].push(currentItem);
          return result;
        },
        {}
      );

      const resultArrays = Object.values(groupedArrays);
      // console.log(resultArrays);
      setLaptopList(resultArrays.find((arr) => arr[0].type === "laptop"));
      setGamingList(resultArrays.find((arr) => arr[0].type === "laptop gaming"));
      setPcGVNList(resultArrays.find((arr) => arr[0].type === "pc gvn"));
      setScreenList(resultArrays.find((arr) => arr[0].type === "screen"));
      setKeyboardList(resultArrays.find((arr) => arr[0].type === "keyboard"));
      setMouseList(resultArrays.find((arr) => arr[0].type === "mouse"));
    }
  }, [allProductsHome]);

  useEffect(() => {
    if (allSlidesHome) {
      //console.log(allSlidesHome);
      setSlides(allSlidesHome.data);
    }
  }, [allSlidesHome]);
  const [isChatBoxOpen, setChatBoxOpen] = useState(false);

  const handleChatIconClick = () => {
    setChatBoxOpen(!isChatBoxOpen);
  };
  const handleCloseChatBox = () => {
    setChatBoxOpen(false);
  };


  return (
    <div className="home-page" style={{ margin: "0 5%" }}>
      {slides && <MainCarousel data={slides} />}
      {laptopList && (
        <GroupedProducts>
          <GroupedProductsTitle>Laptop chính hãng</GroupedProductsTitle>
          <ProductsSlider data={laptopList} />
        </GroupedProducts>
      )}
      {gamingList && (
        <GroupedProducts>
          <GroupedProductsTitle>Laptop Gaming chính hãng</GroupedProductsTitle>
          <ProductsSlider data={gamingList} />
        </GroupedProducts>
      )}
      {pcGVNList && (
        <GroupedProducts>
          <GroupedProductsTitle>PC GVN chính hãng</GroupedProductsTitle>
          <ProductsSlider data={pcGVNList} />
        </GroupedProducts>
      )}
      {screenList && (
        <GroupedProducts>
          <GroupedProductsTitle>Màn hình chính hãng</GroupedProductsTitle>
          <ProductsSlider data={screenList} />
        </GroupedProducts>
      )}
      {keyboardList && (
        <GroupedProducts>
          <GroupedProductsTitle>Bàn phím chính hãng</GroupedProductsTitle>
          <ProductsSlider data={keyboardList} />
        </GroupedProducts>
      )}
      {mouseList && (
        <GroupedProducts>
          <GroupedProductsTitle>Chuột chính hãng</GroupedProductsTitle>
          <ProductsSlider data={mouseList} />
        </GroupedProducts>
      )}
      <div>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<WechatOutlined />}
        style={{
          position: 'fixed',
          bottom: '65px',
          right: '11px',
          padding: '5px',
          transition: 'width 0.3s, height 0.3s, box-shadow 0.3s', 
          width: isChatBoxOpen ? '46px' : '50px',
          height: isChatBoxOpen ? '46px' : '50px',
          boxShadow: isChatBoxOpen ? '0px 4px 8px rgba(30,144,255,0.8)' : 'none',
        }}
        onClick={handleChatIconClick}
      />
        {isChatBoxOpen && (
        <ChatBox onClose={handleCloseChatBox} />
      )}
    </div>
    </div>
  );
};

export default HomePage;
