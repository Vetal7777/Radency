import ReminderI from "./reminder";

interface FormStateI {
    status: {
        create: boolean,
        edit: boolean,
    },
    defaultState : {
        name: string,
        content: string,
        category: string,
    },
    state: null | ReminderI | {
        name: string,
        content: string,
        category: string,
    },
}

export default FormStateI;