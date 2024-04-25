import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSilde'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
})