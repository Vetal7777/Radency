import FormStateI from "../models/formState";

const initialState:FormStateI = {
    status: {
        create: false,
        edit: false,
    },
    defaultState : {
        name: '',
        content: '',
        category: '',
    },
    state: null,
}

export default initialState;