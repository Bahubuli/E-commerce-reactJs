import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addOrder,fetchUserOrders, fetchAllOrders, updateOrder } from "../API/orderApi";

export const addOrderAsync = createAsyncThunk(
        'orders/addOrder',
        async(order)=>{
            const res = await addOrder(order);
            return res.data;
        }
)

export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async(pagination)=>{
        const res = await fetchAllOrders(pagination);
        return res.data;
    }
)

export const fetchUserOrdersAsync = createAsyncThunk(
    'order/fetchUserOrders',
    async(user)=>{
        const res = await fetchUserOrders(user);
        return res.data;
    }
)

export const updateOrderAsync = createAsyncThunk(
    'order/updateOrder',
    async(order)=>{
        const res = await updateOrder(order);
        return res.data;
    }
)
const orderSlice = createSlice(
    {
        name:"order",
        initialState:{
            orders:[],
            currentOrderPlaced:false,
            status:"idle",
            totalOrders:0,
            orderId:null
        },
        reducers:{
            resetOrder:(state)=>{
                state.currentOrderPlaced=false
            }
        },
        extraReducers:(builder)=>{
            builder
            .addCase(addOrderAsync.pending,(state)=>{
                state.status="loading"
            })
            .addCase(addOrderAsync.fulfilled,(state,action)=>{
                state.orders=action.payload
                state.currentOrderPlaced = true;
                state.orderId = action.payload
            })
            .addCase(fetchAllOrdersAsync.pending,(state)=>{
                state.status="loading"
            })
            .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
                state.orders = action.payload.orders
                state.totalOrders = action.payload.totalOrders
                state.currentOrderPlaced = true;
            })
            .addCase(updateOrderAsync.fulfilled,(state,action)=>{
                state.status="idle"
                const idx = state.orders.findIndex(order=>order.id===action.payload.id)
                state.orders[idx] = action.payload

            })
            .addCase(updateOrderAsync.pending,(state)=>{
                state.status="loading"
            })
            .addCase(fetchUserOrdersAsync.pending,(state)=>{
                state.status="loading"
            })
            .addCase(fetchUserOrdersAsync.fulfilled,(state,action)=>{
                state.orders = action.payload
                state.currentOrderPlaced = true;
            })
        }
    }
)

export const {resetOrder} = orderSlice.actions;
export const selectOrders = (state) => state.order.orders
export const selectTotalOrders  = (state)=> state.order.totalOrders
export const selectOrderStatus = (state)=> state.order.currentOrderPlaced

export default orderSlice.reducer;
