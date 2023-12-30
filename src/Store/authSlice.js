import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { autoLogin, checkUser, createUser,forgotPassword,resetPass,signOut, verifyMail } from "../API/authApi";

export const createUserAsync = createAsyncThunk(
    'auth/createUser',
    async(userData)=>{
        const res= await createUser(userData);
        return res.data;
    }
)

export const checkUserAsync = createAsyncThunk(
    "auth/checkUser",
    async(loginInfo)=>{
        const res = await checkUser(loginInfo);
        return res
    }
)

export const signOutAsync = createAsyncThunk(
    'auth/signout',
    async(loginInfo)=>{
        const res = await signOut(loginInfo);
        return res.data;
    }
)

export const verifyMailAsync = createAsyncThunk(
    'auth/verify',
    async(loginInfo)=>{
        const res = await verifyMail(loginInfo);

        return res.data;
    }
)

export const forgotPasswordAsync = createAsyncThunk(
    'auth/forgot',
    async(mail)=>{
        const res = await forgotPassword(mail);
        return res.data;
    }
)

export const resetPasswordAsync = createAsyncThunk(
    'auth/reset',
    async(verifyBody)=>{
        const res = await resetPass(verifyBody);
        return res.data;
    }
)

export const autoLoginAsync = createAsyncThunk(
    "auth/autoLogin",
    async()=>{
        const res = await autoLogin();
        return res.data;
    }
)

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        loggedInUser:null,
        status:"idle",
        error:null,
        msg:""
    },
    reducers:{
        resetMessage:(state)=>{
            state.msg="";
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status="loading"
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.msg=action.payload.msg;
        })
        .addCase(checkUserAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status="idle",
            state.loggedInUser=action.payload
        })
        .addCase(checkUserAsync.rejected,(state,action)=>{
            state.status="idle"
            state.error = action.error
        })
        .addCase(signOutAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(signOutAsync.fulfilled,(state,action)=>{
            state.status="idle",
            state.loggedInUser=null
        })
        .addCase(verifyMailAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(verifyMailAsync.fulfilled,(state,action)=>{
            state.status="idle"
        })
        .addCase(forgotPasswordAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(forgotPasswordAsync.fulfilled,(state,action)=>{
            state.status="idle"
        })
        .addCase(resetPasswordAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(resetPasswordAsync.fulfilled,(state,action)=>{
            state.status="idle"
        })
        .addCase(autoLoginAsync.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(autoLoginAsync.fulfilled,(state,action)=>{
            state.status="idle"
            state.loggedInUser = action.payload
        })
    }
})
export const messageSelector = (state)=>state.auth.msg
export const errorSelector = (state)=>state.auth.error
export const authStateSelector = (state)=>state.auth.status
export const selectLoggedInUser = (state)=> state.auth.loggedInUser
export default authSlice.reducer;
