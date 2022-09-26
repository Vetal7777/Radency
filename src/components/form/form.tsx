import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import styles from './form.module.css'
import {formSlice} from "../../store/reducers/formSlice";
import FormStateI from "../../models/formState";
import ReminderI from "../../models/reminder";
import CategorySelect from "../category-select/category-select";
import {reminderSlice} from "../../store/reducers/remindersSlice";
import API from "../../utils/API";

export default function Form(){
    const reminders = useAppSelector(state => state.reminderSlice.reminders);
    const dispatch = useDispatch();
    const [state,setState] = useState<FormStateI>(useAppSelector(state => state.formSlice))
    const readyForSave = state.state?.name && state.state.content;
    const [hideForm,setHideForm] = useState(false)
    const [optionsState,setOptionsState] = useState(false);
    function isHidingForm(){
        setHideForm(true);
        setTimeout(() => dispatch(formSlice.actions.hideForm()),400);
    }
    useEffect(() => {
        if (state.ready && state.status.create){
            dispatch(reminderSlice.actions.fetch);
            API.post('',state.state)
                .then(response => dispatch(reminderSlice.actions.createSuccess(response.data)))
                .catch(error => dispatch(reminderSlice.actions.failed(error.message)))
            isHidingForm();
        }
        if(state.ready && state.status.edit){
            const id = state.state?.id;
            dispatch(reminderSlice.actions.fetch);
            API.put('' + state.state?.id,state.state)
                .then(response => dispatch(reminderSlice.actions.editSuccess(response.data)))
                .catch(error => dispatch(reminderSlice.actions.failed(error.message)))
            isHidingForm();
        }
    },[state.ready])
    function getCreatedDate():string{
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const now = new Date();
        const month = monthNames[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();
        return `${month} ${date}, ${year}`;
    }
    function createID(){
        const remindersIDs = reminders.map( reminder => reminder.id);
        let id = 0;
        do{
            id = Math.round(Math.random() * 10000000000);
        }while (remindersIDs.includes(id))
        return id;
    }
    function getDates():string{
        const searchedDates = state.state?.content.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g);
        return searchedDates ? searchedDates.join(', ') : '';
    }
    function onCreateClick(){
        setState({...state,
            ready: true,
            state : {...state.state,
                created: getCreatedDate(),
                dates: getDates(),
                id: createID(),
            } as ReminderI
        })
    }
    function onEditClick(){
        setState({...state,
            ready: true,
            state: {...state.state, dates: getDates()} as ReminderI})
    }
    return (
        <>
            <form
                className={`${styles.container} ${hideForm ? styles.hide : ''}`}
                onSubmit={event => event.preventDefault()}
            >
                <div className={styles.header}>
                    <button
                        className={styles.button}
                        children={'Cancel'}
                        onClick={() => isHidingForm()}
                    />
                    <h3
                        children={state.status.create ? 'New reminder' : 'Edit reminder'}
                        className={styles.title}
                    />
                    <button
                        className={`${styles.button} ${!readyForSave ? styles.disable : ''}`}
                        children={state.status.create ? 'Create' : 'Edit'}
                        onClick={state.status.create ? onCreateClick : onEditClick}
                    />
                </div>
                <div className={styles.content}>
                    <input
                        type="text"
                        placeholder={'Name'}
                        value={state.state?.name}
                        onChange={event => setState({...state,state: {...state.state,name: event.target.value} as ReminderI})}
                    />
                    <textarea
                        placeholder={'Content'}
                        value={state.state?.content}
                        onChange={event => setState({...state,state: {...state.state,content: event.target.value} as ReminderI})}
                    />
                </div>
                <div
                    className={styles.category}
                    onClick={() => setOptionsState(!optionsState)}
                >
                    Category
                    <CategorySelect
                        value={state.state?.category as string}
                        optionsState={optionsState}
                        onSelectOption={(categoryName:string) => setState({...state,state: {...state.state,category: categoryName} as ReminderI}) }
                    />
                </div>
            </form>
        </>
    )
}