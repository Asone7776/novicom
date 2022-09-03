import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";
import { updateStatusObject } from "../../types/orders";
export const getOrders = createAsyncThunk(
    "orders/all",
    async (params: any) => {
        const response = await axiosAuth.get('orders', {
            params
        });
        return response.data.data;
    }
);

export const changeStatus = createAsyncThunk(
    "orders/changeStatus",
    async (params: updateStatusObject, { rejectWithValue }) => {
        const { order_id, ...fields } = params;
        try {
            const response = await axiosAuth.patch(`orders/${order_id}`, fields);
            successNotify(response.data.data);
            return response.data.data;
        } catch (error: any) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue(error);
        }
    }
);

