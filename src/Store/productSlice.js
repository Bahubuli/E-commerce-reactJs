import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchAllFilters,fetchProductsByFilter, fetchProductById, createProduct, updateProduct } from "../API/productAPI";

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const res = await fetchAllProducts();
    return res.data;
  }
);

export const fetchAllProductsFilterAsync = createAsyncThunk(
    "product/fetchProductsByFilter",
    async({filter,sort,pagination})=>{
        const res = await fetchProductsByFilter(filter,sort,pagination);
        return res.data;
    }
)

export const fetchAllFiltersAsync=createAsyncThunk(
    "product/filters",
    async()=>{
        const res = await fetchAllFilters();
        return res
    }
)

export const createProductAsync = createAsyncThunk(
    'products/createProduct',
    async(product)=>{
        const res = await createProduct(product);
        return res.data;
    }
)

export const updateProductAsync = createAsyncThunk(
    'products/updateProduct',
    async(product)=>{
        const res = await updateProduct(product);
        return res.data;
    }
)

export const fetchProductByIdAsync=createAsyncThunk(
    "product/fetchProductById",
    async(id)=>{
        const res = await fetchProductById(id);
        return res;
    }
)
export const productSlice = createSlice({
  name: "product",
  initialState: {
    products:[],
    status: "idle",
    totalItems:0,
    filters:[],
    selectedProduct:{}
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchAllProductsFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsFilterAsync.fulfilled, (state, action) => {
        state.status = "idle"
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems
      })
      .addCase(fetchAllFiltersAsync.pending, (state)=>{
        state.filters=[]
        state.status = "loading";
      })
      .addCase(fetchAllFiltersAsync.fulfilled, (state,action)=>{
        state.filters = action.payload

      })
      .addCase(fetchProductByIdAsync.pending, (state)=>{
        state.selectedProduct={}
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state,action)=>{
        state.selectedProduct= action.payload
      })
      .addCase(createProductAsync.pending, (state)=>{
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state,action)=>{
        state.products.push(action.payload)
      })
      .addCase(updateProductAsync.pending, (state)=>{
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state,action)=>{
        state.status="idle"
        const idx = state.products.findIndex(product=>product._id===action.payload._id)
        state.products[idx] = action.payload
      })
  },
});


export const selectFilters = (state)=>state.product.filters
export const selectTotalItems = (state)=> state.product.totalItems
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state)=> state.product.selectedProduct;
export default productSlice.reducer;
