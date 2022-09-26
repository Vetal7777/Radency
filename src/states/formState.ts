import FormStateI from '../models/formState';

const initialState:FormStateI = {
    status: {
        create: false,
        edit: false,
    },
    defaultState : {
        name: '',
        created: '',
        category: '',
        content: '',
        dates:'' ,
        archived: false,
        id: 0
    },
    state: null,
    ready: false,
}

export default initialState;