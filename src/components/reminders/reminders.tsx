import styles from './reminders.module.css'
import {useEffect} from "react";
import {useAppSelector} from "../../hooks/redux";
import API from "../../utils/API";
import {useDispatch} from "react-redux";
import {reminderSlice} from "../../store/reducers/remindersSlice";
import List from "../list/list";
import listColumns from "../../shared/consts/list-columns";
import categoriesColumns from "../../shared/consts/categories-columns";
import {categories} from "../../shared/consts/categories";
import ReminderI from "../../models/reminder";
import {formSlice} from "../../store/reducers/formSlice";
import CreateStartButton from "../create-start-button/create-start-button";
import Form from "../form/form";

export default function Reminders():JSX.Element{
    const dispatch = useDispatch();
    const showEditForm = useAppSelector(state => state.formSlice.status.edit);
    const showCreateForm = useAppSelector(state => state.formSlice.status.create) ;
    const showForm = showCreateForm || showEditForm;
    const reminders = useAppSelector(state => state.reminderSlice.reminders);
    const remindersList = reminders.filter(reminder => !reminder.archived);
    const archiveList = reminders.filter(reminder => reminder.archived);
    const categoriesList = categories
        .map(elem => {
            return {
                category: elem.name,
                noteCategory: elem.name,
                active: reminders.filter(reminder => (reminder.category === elem.name) && !reminder.archived).length + '',
                archived: reminders.filter(reminder => (reminder.category === elem.name) && reminder.archived).length + '',
            }
        });

    useEffect(() => {
        dispatch(reminderSlice.actions.fetch);
        API.get('')
            .then(response => dispatch(reminderSlice.actions.getSuccess(response.data)))
            .catch(error => dispatch(reminderSlice.actions.failed(error.message)))
    },[])

    function onEditClick(id:number){
        const isEditingReminder = reminders.find(reminder => reminder.id === id);
        dispatch(formSlice.actions.showEditForm(isEditingReminder as ReminderI))
    }
    function onArchiveClick(id:number){
        const archivedReminder = {...reminders.find(reminder => reminder.id === id),archived: true} as ReminderI;
        onPut(archivedReminder);
    }
    function onUnArchiveClick(id:number){
        const archivedReminder = {...reminders.find(reminder => reminder.id === id),archived: false} as ReminderI;
        onPut(archivedReminder);
    }
    function onPut(obj:ReminderI){
        dispatch(reminderSlice.actions.fetch);
        API.put('' + obj.id, obj)
            .then(response => dispatch(reminderSlice.actions.editSuccess(response.data)))
            .catch(error => dispatch(reminderSlice.actions.failed(error.message)))
    }
    function onDelete(id:number){
        dispatch(reminderSlice.actions.fetch);
        API.delete('' + id)
            .then(response => dispatch(reminderSlice.actions.deleteSuccess(id)))
            .catch(error => dispatch(reminderSlice.actions.failed(error.message)))
    }
    return (
        <>
            <div
                className={styles.container}
            >
                {showForm && <Form/>}
                        <div className={styles.header}>
                            <CreateStartButton/>
                        </div>
                        <List
                            title={'Reminders'}
                            columnsTitles={listColumns}
                            list={remindersList}
                            buttons={[
                                {
                                    title: 'Edit',
                                    submit: onEditClick,
                                },
                                {
                                    title: 'Archive',
                                    submit: onArchiveClick,
                                },
                                {
                                    title: 'Delete',
                                    submit: onDelete,
                                }
                            ]}
                        />
                        <List
                            title={'Categories'}
                            columnsTitles={categoriesColumns}
                            list={categoriesList}
                        />
                {archiveList.length && (
                    <List
                        title={'Archive'}
                        columnsTitles={listColumns}
                        list={archiveList}
                        buttons={[
                            {
                                title: 'Unarchive',
                                submit: onUnArchiveClick,
                            },
                        ]}
                    />
                )}
            </div>
        </>
    )
}