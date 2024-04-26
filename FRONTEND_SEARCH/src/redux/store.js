import { configureStore } from '@reduxjs/toolkit'
import { useReducer } from 'react'
import productReducer from './slides/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})