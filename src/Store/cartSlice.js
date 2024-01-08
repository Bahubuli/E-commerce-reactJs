import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { addToCart, deleteFromCart, fetchItemsByUserId, resetCart, updateCart } from '../API/cartApi'

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async(item)=>{
        const res = await addToCart(item);
        return res.data;
    }
)

export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
     async(user)=>{
        const res = await fetchItemsByUserId(user);
        console.log(res.data)
        return res.data;
     }
)

export const  updateCartAsync = createAsyncThunk(
    'cart/updateCart',
    async(update)=>{
        const res = await updateCart(update);
        return res.data;
    }
)

export const deleteFromCartAsync = createAsyncThunk(
    'cart/delete',

    async(item)=>{
        const res = await deleteFromCart(item);
        return res.data;
    }
)

export const resetCartAsync = createAsyncThunk(
    'cart/reset',
    async(userId)=>{
        const res = await resetCart(userId);
        return res.data;
    }
)
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addToCartAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(addToCartAsync.fulfilled,(state,action)=>{
            state.status = "idle",
            state.items.push(action.payload)
        })
        .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
            state.status = "idle",
            state.items=action.payload
        })
        .addCase(updateCartAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(updateCartAsync.fulfilled,(state,action)=>{
            state.status = "idle";
            const idx = state.items.findIndex(item=>item._id===action.payload._id)
            state.items[idx] = action.payload
        })
        .addCase(deleteFromCartAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(deleteFromCartAsync.fulfilled,(state,action)=>{
            state.status = "idle";
             const idx = state.items.findIndex(item=>item._id===action.payload._id)
             state.items.splice(idx,1);
        })
        .addCase(resetCartAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(resetCartAsync.fulfilled,(state,action)=>{
             state.status = "idle";
             state.items=[]
        })
    }
})

export const selectCartItems = (state)=> state.cart.items
export default cartSlice.reducer;
