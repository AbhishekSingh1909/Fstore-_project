import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import productReducer from "./reducers/product/productReducer";
import ProductCategoryReducer from "./reducers/category/categoryReducer";
import cartReducer from "./reducers/cart/cartReducer";
import authReducer from "./reducers/userAuthentication/authReducer";
import userReducer from "./reducers/user/userReducer";
import orderReducer from "./reducers/order/orderReducer";
import imageReducer from "./reducers/image/imageReducer";
import addressReducer from "./reducers/address/addressReducer";

const preConfig = {
  key: "root",
  storage,

  blacklist: [
    "productReducer",
    "ProductCategoryReducer",
    "userReducer",
    "authReducer",
    "orderReducer",
    "imageReducer",
    "addressReducer"
  ],
};

const rootReducer = combineReducers({
  productReducer,
  ProductCategoryReducer,
  cartReducer,
  authReducer,
  userReducer,
  orderReducer,
  imageReducer,
  addressReducer
});

const persistedReducer: Reducer<AppState, any> = persistReducer(
  preConfig,
  rootReducer
);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        // to ignore unwanted middleware which cause slow down in application
        immutableCheck: {
          ignoredPaths: [
            "ignoredPath",
            "ignoredNested.one",
            "ignoredNested.two",
          ],
        },
      }),
  });
};

//get Store
const store = createStore();

//to get the state from all reducers
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
