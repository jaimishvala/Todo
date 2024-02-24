import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addProductsData, deleteProductsData, getProductsData, updateProductsData } from "../common/api/fetch.api";


const initialState = {
    isLoading: false,
    fetch: [],
    error: null
}


export const getFetchData = createAsyncThunk(
    'fetch/get',
    async () => {
        let response = await getProductsData();
        return response.data;
    }
)

export const addFetchData = createAsyncThunk(
    'fetch/post',
    async (data) => {
        await addProductsData(data);
        return data
    }
)

export const deleteFetchData = createAsyncThunk(
    'fetch/delete',
    async (id) => {
        await deleteProductsData(id)
        return id
    }
)

export const updateFetchData = createAsyncThunk(
    'fetch/put',
    async (data) => {
        await updateProductsData(data)
        return data

    }
)


export const fetchData = createSlice({
    name: "fetch",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        console.log(builder);

        builder.addCase(getFetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.fetch = action.payload;
        })

        builder.addCase(addFetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.fetch = state.fetch.concat(action.payload);
        })

        builder.addCase(deleteFetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.fetch = state.fetch.filter((v) => v.id !== action.payload);
        })

        builder.addCase(updateFetchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.fetch = state.fetch.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            });
        })
    }
})


export default fetchData.reducer;

