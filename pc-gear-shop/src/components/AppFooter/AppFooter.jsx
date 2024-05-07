import React from "react";
import { Layout } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  YoutubeFilled,
  InstagramOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const shippingImages = [
  "https://theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=5125",
  "https://www.dhl.com/content/dam/dhl/global/core/images/logos/glo-footer-logo.svg",
];
const paymentImages = [
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5125",
  "https://theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5125",
];

const AppFooter = () => (
  <>
    <style>
      {`
        .footer-link {
          color: black;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #1890ff;
        }
        li {
          padding-bottom: 8px; 
        }
        li:last-child {
          margin-bottom: 0;
        }
        h4 {
          margin-bottom: 15px; 
        }
        a {
  color: black;
}
      `}
    </style>
    <Footer style={{ background: "#f0f2f5", padding: "40px 50px" }}>
      <div
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "30px",
          alignItems: "start",
        }}
      >
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#1890ff" }}>VỀ GEAR SHOP</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="#" className="footer-link">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Tuyển dụng
              </a>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#1890ff" }}>CHÍNH SÁCH</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="#" className="footer-link">
                Chính sách bảo hành
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Chính sách thanh toán
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Chính sách giao hàng
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Chính sách bảo mật
              </a>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#1890ff" }}>THÔNG TIN</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a href="#" className="footer-link">
                Hệ thống cửa hàng
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Hướng dẫn mua hàng
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Tra cứu địa chỉ bảo hành
              </a>
            </li>
          </ul>
        </div>
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#1890ff" }}>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
          <p>Mua hàng: .........</p>
          <p>Bảo hành: .........</p>
          <p>Email: cskh@.....com</p>
        </div>
        <div style={{ textAlign: "left" }}>
          <h4 style={{ color: "#1890ff" }}>ĐƠN VỊ VẬN CHUYỂN</h4>
          {shippingImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Shippings Methods"
              style={{ maxWidth: "25%", margin: "5px" }}
            />
          ))}
          <h4 style={{ color: "#1890ff" }}>CÁCH THỨC THANH TOÁN</h4>
          {paymentImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt="Payment Methods"
              style={{ maxWidth: "20%", margin: "auto" }}
            />
          ))}
        </div>
      </div>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "#ddd",
          marginBottom: "20px",
        }}
      />
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h4 style={{ color: "#1890ff" }}>KẾT NỐI VỚI CHÚNG TÔI</h4>
        <div>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FacebookFilled style={{ fontSize: "24px", margin: "0 10px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <TwitterCircleFilled
              style={{ fontSize: "24px", margin: "0 10px" }}
            />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <YoutubeFilled style={{ fontSize: "24px", margin: "0 10px" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined
              style={{ fontSize: "24px", margin: "0 10px, color: black" }}
            />
          </a>
        </div>
      </div>
    </Footer>
  </>
);

export default AppFooter;
