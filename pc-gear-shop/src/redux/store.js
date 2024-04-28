import { configureStore } from '@reduxjs/toolkit'
//import { useReducer } from 'react'
import productReducer from './slices/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})