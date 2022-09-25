import ReminderI from "./reminder";

export interface IRemindersState {
    reminders: [] | ReminderI[],
    isLoading: boolean,
    error: null | string,
}
