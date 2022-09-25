import {combineReducers, configureStore} from "@reduxjs/toolkit";
import reminderSlice from "./reducers/remindersSlice";
import formSlice from "./reducers/formSlice";

const rootReducer = combineReducers({ reminderSlice, formSlice });

export  const setupStore = () => {
    return configureStore(
        {
            reducer: rootReducer,
        }
    )
}

export type RootState = ReturnType<typeof rootReducer>;