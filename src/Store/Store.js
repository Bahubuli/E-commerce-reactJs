import {configureStore} from '@reduxjs/toolkit';
import productReducer from './productSlice'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import userReducer from './userSlice'
import addressReducer from './addressSlice'
export const appStore = configureStore({
    reducer:{
        product:productReducer,
        auth:authReducer,
        cart:cartReducer,
        order:orderReducer,
        user:userReducer,
        address:addressReducer
    }
})
