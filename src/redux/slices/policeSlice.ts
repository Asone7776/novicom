import { createSlice } from '@reduxjs/toolkit'
import { savePolicy, updatePolicy } from '../actions/policeActions';
import { policeInitialStateType } from '../../types/polices/index';
const initialState: policeInitialStateType = {
    savedPolicy: {
        loading: false,
        data: null,
        error: null,
        success: false
    },
    updatedPolicy: {
        loading: false,
        error: null,
        success: false
    },
    holdedPolice: null
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        resetSavedPolicy: (state) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = null;
            state.savedPolicy.error = null;
            state.savedPolicy.success = false;
        },
        resetUpdatePolicy: (state) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.success = false;
            state.updatedPolicy.error = null;
        },
        resetSaveSuccess: (state) => {
            state.savedPolicy.success = false;
        },
        holdPolice: (state, action) => {
            state.holdedPolice = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Create
        builder.addCase(savePolicy.pending, (state) => {
            state.savedPolicy.loading = true;
            state.savedPolicy.data = null;
            state.savedPolicy.error = null;
            state.savedPolicy.success = false;
        })
        builder.addCase(savePolicy.fulfilled, (state, action) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = action.payload;
            state.savedPolicy.error = null;
            state.savedPolicy.success = true;
        })
        builder.addCase(savePolicy.rejected, (state, action) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = null;
            state.savedPolicy.error = action.payload;
            state.savedPolicy.success = false;
        })
        // Update
        builder.addCase(updatePolicy.pending, (state) => {
            state.updatedPolicy.loading = true;
            state.updatedPolicy.error = null;
            state.updatedPolicy.success = false;
        })
        builder.addCase(updatePolicy.fulfilled, (state) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.success = true;
            state.updatedPolicy.error = null;
        })
        builder.addCase(updatePolicy.rejected, (state, action) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.error = action.payload;
            state.updatedPolicy.success = false;
        })
    },
})

export const { resetSavedPolicy, holdPolice, resetSaveSuccess, resetUpdatePolicy } = policeSlice.actions;

export default policeSlice.reducer;