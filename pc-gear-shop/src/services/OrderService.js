import { axiosJWT } from "./UserService";

export const createOrder = async(data, access_token) => {
  const res = await axiosJWT.post(`http://localhost:3001/api/OrderDetail/createOrder/${data.user}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });
  console.log("Order service return: ", res.data)
  return res.data
}