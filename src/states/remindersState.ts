import {IRemindersState} from "../models/remindersState";

const initialState:IRemindersState = {
    reminders: [],
    isLoading: false,
    error: null,
}

export default initialState;