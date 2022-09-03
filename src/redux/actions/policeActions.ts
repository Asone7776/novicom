import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosAuth } from '../../axios-instances';
import { failureNotify, successNotify } from "../../notifications";

export const savePolicy = createAsyncThunk(
    "police/savePolicy",
    async (data: any, { rejectWithValue }) => {
        try {
            const response = await axiosAuth.post('/save_policy', data);
            successNotify('Успешно');
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


export const updatePolicy = createAsyncThunk(
    "police/updatePolicy",
    async (data: any, { rejectWithValue }) => {
        const { id, ...fields } = data;
        try {
            const response = await axiosAuth.post(`/update_policy/${id}`, fields);
            successNotify('Успешно обновлено');
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