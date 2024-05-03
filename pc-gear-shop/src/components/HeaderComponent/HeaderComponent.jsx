import { Col, Row } from "antd";
import React from "react";
import { WrapperHeader } from "./style";

const HeaderComponent = () => {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>Header</Col>
        <Col span={12}>Header</Col>
        <Col span={6}>Header</Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
