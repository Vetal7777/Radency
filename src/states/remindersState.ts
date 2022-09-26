import {IRemindersState} from "../models/remindersState";

const initialState:IRemindersState = {
    reminders: [],
    isLoading: true,
    error: null,
}

export default initialState;