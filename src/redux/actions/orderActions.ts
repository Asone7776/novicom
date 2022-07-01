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
        return response.data;
    }
);

export const changeStatus = createAsyncThunk(
    "orders/changeStatus",
    async (params: updateStatusObject, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.patch(`orders`, params);
            successNotify(response.data.data);
            return response.data.data;
        } catch (error: any) {
            if (error.response.data && error.response.data.error) {
                failureNotify(error.response.data.error);
                return rejectWithValue(error.response.data.error);
            }
            return rejectWithValue(error);
        }
    }
);

