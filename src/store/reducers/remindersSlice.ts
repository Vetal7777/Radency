import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import initialState from "../../states/remindersState";
import ReminderI from "../../models/reminder";

export const reminderSlice = createSlice({
    name: 'reminders',
    initialState,
    reducers: {
        fetch(state){
            state.isLoading = true;
        },
        failed(state,action:PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        },
        getSuccess(state,action:PayloadAction<ReminderI[]>){
            state.reminders = action.payload;
        },
        deleteSuccess(state,action:PayloadAction<number>){
            state.reminders = state.reminders.filter(reminder => reminder.id !== action.payload);
        },
        editSuccess(state,action:PayloadAction<ReminderI>){
            state.reminders = state.reminders.map(reminder => reminder.id === action.payload.id ? action.payload : reminder);
        },
        createSuccess(state,action:PayloadAction<ReminderI>){
            state.reminders = [...state.reminders,action.payload];
        }
    }
})

export default reminderSlice.reducer;