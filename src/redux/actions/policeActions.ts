import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";

export const calculatePolicy = createAsyncThunk(
    "police/calculatePolicy",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('calculate_policy_lb', data);
            successNotify('Успешно');
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


