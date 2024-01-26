import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addOrder,fetchUserOrders, fetchAllOrders, updateOrder, finishOrder } from "../API/orderApi";

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
export const finishOrderAsync = createAsyncThunk(
    'order/finishOrder',
    async(orderData)=>{
        const res = await finishOrder(orderData)
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
            orderId:null,
            orderDetails:{}

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
                state.orderDetails=action.payload
                state.currentOrderPlaced = true;
                state.status = "idle"
            })
            .addCase(fetchAllOrdersAsync.pending,(state)=>{
                state.status="loading"
            })
            .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
                state.orders = action.payload.orders
                state.totalOrders = action.payload.totalOrders
                state.currentOrderPlaced = true;
                state.status = "idle"
            })
            .addCase(updateOrderAsync.fulfilled,(state,action)=>{
                state.status="idle"
                const idx = state.orders.findIndex(order=>order._id==action.payload.order._id)
                state.orders[idx] = action.payload.order

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
                state.status = "idle"
            })
            .addCase(finishOrderAsync.pending,(state)=>{
                state.status ="loading"
            })
            .addCase(finishOrderAsync.fulfilled,(state,action)=>{
                state.status="idle"
            })
        }
    }
)

export const {resetOrder} = orderSlice.actions;
export const selectOrders = (state) => state.order.orders
export const selectTotalOrders  = (state)=> state.order.totalOrders
export const selectOrderStatus = (state)=> state.order.currentOrderPlaced
export const selectOrderDetails = (state)=>state.order.orderDetails;

export default orderSlice.reducer;
