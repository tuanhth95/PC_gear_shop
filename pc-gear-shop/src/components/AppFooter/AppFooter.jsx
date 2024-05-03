import React from "react";
import { Layout } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => (
  <Footer style={{ background: "#f0f2f5", padding: "20px 50px" }}>
    <div
      className="footer-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "20px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h4>VỀ GEAR SHOP</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <a href="#">Giới thiệu</a>
          </li>
          <li>
            <a href="#">Tuyển dụng</a>
          </li>
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>CHÍNH SÁCH</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <a href="#">Chính sách bảo hành</a>
          </li>
          <li>
            <a href="#">Chính sách thanh toán</a>
          </li>
          <li>
            <a href="#">Chính sách giao hàng</a>
          </li>
          <li>
            <a href="#">Chính sách bảo mật</a>
          </li>
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>THÔNG TIN</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <a href="#">Hệ thống cửa hàng</a>
          </li>
          <li>
            <a href="#">Hướng dẫn mua hàng</a>
          </li>
          <li>
            <a href="#">Tra cứu địa chỉ bảo hành</a>
          </li>
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
        <p>Mua hàng: .........</p>
        <p>Bảo hành: .........</p>
        <p>Email: cskh@.....com</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <h4>ĐƠN VỊ VẬN CHUYỂN</h4>
        <img
          src="path_to_your_logos"
          alt="Shipping Logos"
          style={{ maxWidth: "100%", margin: "auto" }}
        />
        <h4>CÁCH THỨC THANH TOÁN</h4>
        <img
          src="path_to_your_payment_methods"
          alt="Payment Methods"
          style={{ maxWidth: "100%", margin: "auto" }}
        />
      </div>
    </div>
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h4>KẾT NỐI VỚI CHÚNG TÔI</h4>
      <div>
        <FacebookFilled style={{ fontSize: "24px", margin: "0 10px" }} />
        <TwitterCircleFilled style={{ fontSize: "24px", margin: "0 10px" }} />
        <YoutubeFilled style={{ fontSize: "24px", margin: "0 10px" }} />
        <InstagramOutlined style={{ fontSize: "24px", margin: "0 10px" }} />
      </div>
    </div>
  </Footer>
);
export default AppFooter;
