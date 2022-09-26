import ReminderI from "./reminder";

interface FormStateI {
    status: {
        create: boolean,
        edit: boolean,
    },
    defaultState : ReminderI,
    state: null | ReminderI,
    ready: boolean,
}

export default FormStateI;