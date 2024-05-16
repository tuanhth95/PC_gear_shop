import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
  id: "",
  isAdmin: false,
  city: "",
  refreshToken: "",
  tempShipAddr: 0,
  tempShipAddrNone: {},
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      console.log("action.payload:", action.payload);
      const {
        username = "",
        name = "",
        email = "",
        access_token = "",
        address = "",
        phone = "",
        avatar = "",
        _id = "",
        isAdmin,
        city = "",
        refreshToken = "",
        shippingAddress = [],
      } = action.payload.data;
      state.name = username ? username : state.name;
      state.email = email ? email : state.email;
      state.address = address ? address : state.address;
      state.phone = phone ? phone : state.phone;
      state.avatar = avatar ? avatar : state.avatar;
      state.id = _id ? _id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
      state.city = city ? city : state.city;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
      state.shippingAddress =
        shippingAddress.length != 0 ? shippingAddress : state.shippingAddress;
      console.log(action, state.name);
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.address = "";
      state.phone = "";
      state.avatar = "";
      state.id = "";
      state.access_token = "";
      state.isAdmin = false;
      state.city = "";
      state.refreshToken = "";
      state.shippingAddress = [];
      state.tempShipAddr = -1;
    },
    addShippingAddressUser: (state, action) => {
      const sa = action.payload;
      console.log("payload: ", sa);
      console.log("before add ship redux: ", state.shippingAddress);
      if (!state.shippingAddress) {
        console.log("1st con");
        state.shippingAddress = [sa];
      } else {
        console.log("2nd con");
        if (state.id == "") {
          state.shippingAddress = [sa];
        } else {
          state.shippingAddress = [...state.shippingAddress, sa];
        }
      }
      console.log("after add ship redux: ", state.shippingAddress);
    },
    saveTempShipAddr: (state, action) => {
      let index = action.payload;
      state.tempShipAddr = index;
      console.log("after save: ", state.tempShipAddr)
    },
    deleteTempShipAddr: (state, action) => {
      state.tempShipAddr = 0;
    },
    saveTempShipAddrNone: (state, action) => {
        state.tempShipAddrNone = action.payload;
        console.log("saveTempShipAddrNone after: ",state.tempShipAddrNone);
    },
    deleteTempShipAddrNone: (state, action) => {
        state.tempShipAddrNone = {};
        console.log("deleteTempShipAddrNone after: ",state.tempShipAddrNone);
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  updateUser,
  resetUser,
  addShippingAddressUser,
  saveTempShipAddr,
  deleteTempShipAddr,
  saveTempShipAddrNone,
  deleteTempShipAddrNone
} = userSlide.actions;

export default userSlide.reducer;
