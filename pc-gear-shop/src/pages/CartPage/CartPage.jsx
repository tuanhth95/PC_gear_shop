import StepComponent from "../../components/StepConponent/StepComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import Loading from "../../components/LoadingComponent/Loading";
import InputComponent from "../../components/InputComponent/InputComponent";
import {
  increaseProductAmount,
  decreaseProductAmount,
  removeCartProduct,
} from "../../redux/slices/cartSlide";
import { updateUser } from "../../redux/slices/userSlide";
import * as UserService from "../../services/UserService";
import { convertPrice } from "../../utils";
import {
  WrapperLeft,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperListOrder,
  WrapperItemOrder,
  WrapperCountOrder,
  WrapperInfo,
  WrapperInputNumber,
  WrapperRight,
  WrapperTotal,
  CustomCheckbox,
} from "./style";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Form, message, Radio, Space, Input } from "antd";
import { useDispatch } from "react-redux";
import * as OrderService from "../../services/OrderService";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [processState, setProcessState] = useState(0);
  const [stateUserDetails, setStateUserDetails] = useState({
    username: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const mutationAddOrder = useMutationHook((data) => {
    const { token, ...rest } = data;
    const res = OrderService.createOrder({ ...rest }, token);
    return res;
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.checked) {
      setListChecked([...listChecked, e.target.value]);
    } else {
      let temp = listChecked.filter((item) => item != e.target.value);
      setListChecked(temp);
    }
  };
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseProductAmount({ idProduct }));
      }
    }
    if (type == "decrease") {
      if (!limited) {
        dispatch(decreaseProductAmount({ idProduct }));
      }
    }
  };
  const delay = async (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };
  const handleDeleteOrder = (idProduct) => {
    dispatch(removeCartProduct({ idProduct }));
  };

  const handleRemoveAllOrder = () => {
    dispatch(removeCartProduct({ idProduct: -1 }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      let temp = [];
      cart?.orderItems.forEach((item) => temp.push(item?.id));
      setListChecked(temp);
    } else {
      setListChecked([]);
    }
  };
  const onPaymentMethodChange = (e) => {
    console.log("radio checked", e.target.value);
    setPaymentMethod(e.target.value);
  };
  useEffect(() => {
    if (orderSuccess) {
      const a = async () => {
        await delay(5000);
        setListChecked([]);
        setStateUserDetails({
          username: "",
          phone: "",
          address: "",
          city: "",
        });
        setProcessState(0);
        dispatch(removeCartProduct({ idProduct: -1 }));
        setOrderSuccess(false);
      };
      a();
    }
  }, [orderSuccess]);
  useEffect(() => {
    // dispatch(selectedOrder({listChecked}))
  }, [listChecked]);

  useEffect(() => {
    // form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      console.log(user.name);
      setStateUserDetails({
        username: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
      });
      form.setFieldsValue(stateUserDetails);
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = cart?.orderItems?.reduce((total, cur) => {
      if (listChecked.includes(cur?.id)) {
        return total + cur.price * cur.amount;
      }
    }, 0);
    if (!result) return 0;
    return result;
  }, [cart, listChecked]);

  const priceDiscountMemo = useMemo(() => {
    const result = cart?.orderItems.reduce((total, cur) => {
      if (listChecked.includes(cur?.id)) {
        return total + (cur?.price * cur?.amount * cur?.discount) / 100;
      }
    }, 0);
    if (!result) return 0;
    return result;
  }, [cart, listChecked]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 1000000 || listChecked.length === 0) {
      return 0;
    } else {
      return 50000;
    }
  }, [priceMemo, listChecked]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, deliveryPriceMemo]);

  const handleAddCard = () => {
    if (listChecked.length == 0) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else if (processState == 1) {
      if (
        user?.access_token &&
        cart?.orderItems.filter((item) => listChecked.includes(item.id)) &&
        user?.name &&
        user?.address &&
        user?.phone &&
        user?.city &&
        priceMemo &&
        user?.id
      ) {
        console.log("check pass ");
        mutationAddOrder.mutate(
          {
            token: user?.access_token,
            orderItems: cart?.orderItems.filter((item) =>
              listChecked.includes(item.id)
            ),
            fullname: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod:
              paymentMethod == 1 ? "COD" : paymentMethod == 2 ? "Bank" : "Momo",
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            email: user?.email,
          },
          {
            onSuccess: (data) => {
              setOrderSuccess(true);
              setProcessState(2);
            },
          }
        );
      }
    } else {
      setProcessState(1);
    }
  };

  const onBack = () => {
    setProcessState(0);
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading = false, data } = mutationUpdate;

  const handleCancleUpdate = () => {
    setStateUserDetails({
      username: "",
      phone: "",
      address: "",
      city: "",
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInforUser = () => {
    const { username, address, city, phone } = stateUserDetails;
    if (username && address && city && phone) {
      console.log("update user: ", user?.id, " with data: ", stateUserDetails);
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ data: { username, address, city, phone } }));
            console.log("before dispatch");
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const itemsDelivery = [
    {
      title: "Giỏ hàng",
    },
    {
      title: "Thanh toán",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div
        style={{
          height: "100%",
          width: "1270px",
          margin: "0 auto",
          padding: "16px 0px",
        }}
      >
        <h3 style={{ fontWeight: "bold", margin: "16px 0px" }}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent items={itemsDelivery} current={processState} />
            </WrapperStyleHeaderDelivery>
            {processState == 0 ? (
              <>
                <WrapperStyleHeader>
                  <span style={{ display: "inline-block", width: "390px" }}>
                    <CustomCheckbox
                      onChange={handleOnchangeCheckAll}
                      checked={listChecked?.length === cart?.orderItems?.length}
                    ></CustomCheckbox>
                    <span> Tất cả ({cart?.orderItems?.length} sản phẩm)</span>
                  </span>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <DeleteOutlined
                      style={{ cursor: "pointer" }}
                      onClick={handleRemoveAllOrder}
                    />
                  </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                  {cart?.orderItems.length === 0 ? (
                    <div
                      style={{
                        width: "100%",
                        height: "fit-content",
                        padding: "60px 60px",
                        background: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "48px",
                      }}
                    >
              
                      <span style={{ fontSize: "50px", fontWeight: "500", color: "#aaa"}}>
                        Chưa có sản phẩm trong giỏ hàng
                      </span>
                    </div>
                  ) : (
                    <>
                      {cart?.orderItems?.map((order) => {
                        return (
                          <WrapperItemOrder key={order?.id}>
                            <div
                              style={{
                                width: "390px",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <CustomCheckbox
                                onChange={onChange}
                                value={order?.id}
                                checked={listChecked.includes(order?.id)}
                              ></CustomCheckbox>
                              <img
                                src={order?.img}
                                style={{
                                  width: "77px",
                                  height: "79px",
                                  objectFit: "cover",
                                }}
                              />
                              <div
                                style={{
                                  width: 260,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {order?.name}
                              </div>
                            </div>
                            <div
                              style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>
                                <span
                                  style={{ fontSize: "13px", color: "#242424" }}
                                >
                                  {convertPrice(order?.price)}
                                </span>
                              </span>
                              <WrapperCountOrder>
                                <button
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleChangeCount(
                                      "decrease",
                                      order?.id,
                                      order?.amount === 1
                                    )
                                  }
                                >
                                  <MinusOutlined
                                    style={{ color: "#000", fontSize: "10px" }}
                                  />
                                </button>
                                <WrapperInputNumber
                                  defaultValue={order?.amount}
                                  value={order?.amount}
                                  size="small"
                                  min={1}
                                  max={order?.countInstock}
                                />
                                <button
                                  style={{
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleChangeCount(
                                      "increase",
                                      order?.id,
                                      order?.amount === order.countInstock,
                                      order?.amount === 1
                                    )
                                  }
                                >
                                  <PlusOutlined
                                    style={{ color: "#000", fontSize: "10px" }}
                                  />
                                </button>
                              </WrapperCountOrder>
                              <span
                                style={{
                                  color: "rgb(255, 66, 78)",
                                  fontSize: "13px",
                                  fontWeight: 500,
                                }}
                              >
                                {convertPrice(order?.price * order?.amount)}
                              </span>
                              <DeleteOutlined
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteOrder(order?.id)}
                              />
                            </div>
                          </WrapperItemOrder>
                        );
                      })}
                    </>
                  )}
                </WrapperListOrder>
              </>
            ) : processState === 1 ? (
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  padding: "24px 16px",
                  background: "#fff",
                }}
              >
                <WrapperInfo>Lựa chọn phương thức thanh toán</WrapperInfo>
                <Radio.Group
                  onChange={onPaymentMethodChange}
                  value={paymentMethod}
                  defaultValue={1}
                >
                  <Space direction="vertical">
                    <Radio value={1}>Thanh toán COD</Radio>
                    <Radio value={2}>Thanh toán qua ngân hàng</Radio>
                    <Radio value={3}>Thanh toán qua momo</Radio>
                  </Space>
                </Radio.Group>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  padding: "60px 60px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "48px",
                }}
              >
                <CheckCircleFilled
                  style={{
                    background: "#fff",
                    color: "#5dbb63",
                    fontSize: "250px",
                  }}
                />
                <span style={{ fontSize: "40px", fontWeight: "500" }}>
                  Đơn hàng đã được tạo thành công
                </span>
              </div>
            )}
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceDiscountMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(deliveryPriceMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            {processState == 1 && (
              <ButtonComponent
                onClick={() => onBack()}
                size={40}
                styleButton={{
                  background: "rgb(100, 100, 100)",
                  height: "48px",
                  width: "320px",
                  border: "none",
                  borderRadius: "4px",
                }}
                textButton={"Trở lại"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
            )}
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={processState == 0 ? "Tiếp theo" : "Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <InputComponent
                value={stateUserDetails["city"]}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your  phone!" }]}
            >
              <InputComponent
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Adress"
              name="address"
              rules={[
                { required: true, message: "Please input your  address!" },
              ]}
            >
              <InputComponent
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
    </div>
  );
};
export default CartPage;
