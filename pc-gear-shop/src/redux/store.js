import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./slices/counterSlide";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlide";
import cartReducer from "./slices/cartSlide";
import collectionReducer from "./slices/collectionSlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ['product'],
};
const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  collection: collectionReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
