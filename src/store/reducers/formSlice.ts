import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "../../states/formState";
import ReminderI from "../../models/reminder";

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        showCreateForm(state){
            state.status.create = true;
            state.state = state.defaultState;
        },
        showEditForm(state,action:PayloadAction<ReminderI>){
            state.status.create = true;
            state.state = action.payload;
        },
    }
})

export default formSlice.reducer;