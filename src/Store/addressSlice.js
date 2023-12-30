import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addAddress, getAddress, removeAddress, updateAddress } from "../API/addressApi";

export const getAddressAsync = createAsyncThunk(
    "address/get",
    async(user)=>{
        const res = await getAddress(user);
        return res.data;
    }
)

export const addAddressAsync = createAsyncThunk(
    'address/add',
    async(address)=>{
        const res = await addAddress(address);
        return res.data;
    }
)

export const removeAddressAsync = createAsyncThunk(
    'address/remove',
    async(address)=>{
        const res = await removeAddress(address);
        return res.data;
    }
)

export const updateAddressAsync = createAsyncThunk(
    'address/update',
    async(address)=>{
        const res = await updateAddress(address);
        return res.data;
    }
)

const addressSlice= createSlice({
    name:"address",
    initialState:{
        items:[],
        status:"idle"
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addAddressAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(addAddressAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.items.push(action.payload)
        })
        .addCase(getAddressAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(getAddressAsync.fulfilled,(state,action)=>{
            state.status="idle",
            state.items = action.payload
        })
        .addCase(updateAddressAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(updateAddressAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const idx = state.items.findIndex(item=>item._id===action.payload._id)
            state.items[idx] = action.payload
        })
        .addCase(removeAddressAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(removeAddressAsync.fulfilled,(state,action)=>{
            state.status="idle"
            const idx = state.items.findIndex(item=>item._id===action.payload._id)
            state.items.splice(idx,1);
        })
    }

})

export const addressSelector = (state) => state.address.items
export default addressSlice.reducer
