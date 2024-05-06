import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice({
  name: 'cart',
  initialState:{
    orderItems: [
      // {
      //   id: ,
      //   name: ,
      //   type: ,
      //   price: ,
      //   discount: p,
      //   img: 
      // }

    ],
    shippingAddress: {

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
  },
  reducers:{
    addCartProduct: (state, action) => {
      const product = action.payload
      const productFind = state?.orderItems?.find((item) => item?.id === product.id)
      if(productFind){
        productFind.amount += 1;
      }
      else{
        product.amount = 1;
        state.orderItems.push(product);
      }
      console.log(product);
      console.log(state.orderItems)
    },
    removeCartProduct: (state, action) => {
      const {idProduct} = action.payload
      let productFilter = []
      if(idProduct != -1){
        productFilter = state?.orderItems?.find((item) => item?.id != idProduct)
      }
      state.orderItems = productFilter
    },
    increaseProductAmount: (state, action) => {
      const idProduct = action.payload.idProduct;
      let product = state.orderItems.find((item) => item.id == idProduct)
      if (product){
        console.log(product)
        product.amount += 1;
      }
    },
    decreaseProductAmount: (state, action) => {
      const idProduct = action.payload.idProduct;
      console.log(state.orderItems);
      let product = state.orderItems.find((item) => item?.id === idProduct)
      product.amount -= 1;
    },
  }
})
export const { addCartProduct, removeCartProduct, increaseProductAmount, decreaseProductAmount } = cartSlide.actions
export default cartSlide.reducer