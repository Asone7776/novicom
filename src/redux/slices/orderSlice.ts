import { createSlice } from "@reduxjs/toolkit"
import { getOrders, changeStatus } from '../actions/orderActions';
import { OrdersInitialState } from "../../types/orders";
const initialState: OrdersInitialState = {
    loading: false,
    data: null,
    error: null,
    changeStatus: {
        loading: false,
        data: null,
        success: false,
        error: null
    }
}
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.changeStatus = {
                loading: false,
                data: null,
                success: false,
                error: null
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        })
        builder.addCase(changeStatus.pending, (state) => {
            state.changeStatus.loading = true;
        })
        builder.addCase(changeStatus.fulfilled, (state, action) => {
            state.changeStatus = {
                loading: false,
                data: action.payload,
                success: true,
                error: null
            }
        })
        builder.addCase(changeStatus.rejected, (state, action) => {
            state.changeStatus = {
                loading: false,
                data: null,
                success: false,
                error: action.payload
            }
        })
    }
});
export const { resetStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
