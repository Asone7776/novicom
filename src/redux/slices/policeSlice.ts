import { createSlice } from '@reduxjs/toolkit'
import { calculatePolicy } from '../actions/policeActions';
import { policeInitialStateType } from '../../types/polices/index';
const initialState: policeInitialStateType = {
    loading: false,
    data: null,
    error: null
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        resetCalculatePolicy: (state) => {
            state = {
                loading: false,
                data: null,
                error: null,
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calculatePolicy.pending, (state) => {
            state = {
                loading: true,
                data: null,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.fulfilled, (state, action) => {
            state = {
                loading: false,
                data: action.payload,
                error: null,
            }
        })
        builder.addCase(calculatePolicy.rejected, (state, action) => {
            state = {
                loading: false,
                data: null,
                error: action.payload,
            }
        })
    },
})

export const { resetCalculatePolicy } = policeSlice.actions;

export default policeSlice.reducer;