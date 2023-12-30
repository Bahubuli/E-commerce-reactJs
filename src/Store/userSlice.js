import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

import { fetchLoggedInUserOrders,updateUser,fetchLoggedInUser } from '../API/userApi'

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async(userId)=>{
        const res = await fetchLoggedInUserOrders(userId);
        return res.data;
    }
)

export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async(userInfo)=>{
        const res = await updateUser(userInfo);
        return res.data;
    }
)

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async(id)=>{
        const res = await fetchLoggedInUser(id);
        return res.data;
    }
)


const userSlice = createSlice({
    name:"user",
    initialState:{
        userOrders:[],
        status:"idle",
        userInfo:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled,(state,action)=>{
            state.userOrders=action.payload
        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.status="idle",
            state.userInfo=action.payload
        })
        .addCase(updateUserAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
            state.status="idle",
            state.userInfo=action.payload
        })
        .addCase(fetchLoggedInUserAsync.pending,(state)=>{
            state.status="loading"
        })
    }
})
export const selectUserInfo = (state)=> state.user.userInfo
export const selectUserOrders  = (state)=>state.user.userOrders;
export default userSlice.reducer
