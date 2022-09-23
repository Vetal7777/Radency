import './main.sass';
import RemindersHeaderView from "./header";
import RemindersListView from "./list";
import RemindersCategoriesView from "./categories";
import RemindersFormView from "./form";
import RemindersArchiveView from "./archive";

export default class RemindersMainView{
    static CLASSES = {
        archive: 'reminders__archive',
        container: 'reminders__container',
        header: 'reminders__header',
        list: 'reminders__list',
        categories: 'reminders__categories',
        form: 'reminders__form',
        activeForm: 'active-form',
    }
    state = {
        create: false,
        edit: false,
    };
    archive = null;
    categories = null;
    container = null;
    editForm = null;
    form = null;
    header = null;
    list = null;
    options = null;
    reminders = null;
    constructor(root,options) {
        this.init(root,options);
    }
    createComponent(){
        return `
            <div class=${RemindersMainView.CLASSES.container}>
                <div class=${RemindersMainView.CLASSES.header}></div>
                <div class=${RemindersMainView.CLASSES.list}></div>
                <div class=${RemindersMainView.CLASSES.categories}></div>
                <div class=${RemindersMainView.CLASSES.archive}></div>
                <form class=${RemindersMainView.CLASSES.form}></form>
            </div>
        `
    }
    cleanState(){
        this.state.create = false;
        this.state.edit = false;
    }
    createNewReminder(reminder){
        this.options.createNewReminder(this.returnReminderWithId(reminder))
    }
    getRemindersState(reminders){
        this.reminders = reminders;
        this.list.getRemindersState(this.reminders);
        this.categories.getRemindersState(this.reminders);
        this.archive.getRemindersState(this.reminders);
    }
    init(root,options){
        this.options = options;
        this.renderComponent(root);
        this.container = root.querySelector(`.${RemindersMainView.CLASSES.container}`);
        this.setViews();
        this.setEventListeners();
    }
    onClick(event){
        const activeForm = !!this.state.create || !!this.state.edit;
        const showCreateFormClick = this.header.validateShowFormClick(event.target);
        const formCancelClick = activeForm ? this.form.validateCancelClick(event.target) : false;
        const formCreateClick = activeForm ? this.form.validateCreateClick(event.target) : false;
        const formEditClick = activeForm ? this.form.validateEditClick(event.target) : false;
        const formShowOptionsClick = activeForm ? this.form.validateShowOptionsClick(event.target) : false;
        const formHideOptionsClick = activeForm ? this.form.validateHideOptionsClick(event.target) : false;
        const formSelectOptionClick = activeForm ? this.form.validateSelectOptionClick(event.target) : false;
        const listItemShowClick = this.list.validateItemShowClick(event.target);
        const archiveListItemShowClick = this.archive.validateItemShowClick(event.target);
        const listItemDeleteClick = this.list.validateItemDeleteClick(event.target);
        const listItemArchiveClick = this.list.validateItemArchiveClick(event.target);
        const listItemEditClick = this.list.validateItemEditClick(event.target);
        const archiveListItemEditClick = this.archive.validateItemUnArchiveClick(event.target);
        switch (true){
            case showCreateFormClick:
                this.state.create = true;
                this.container.classList.toggle(RemindersMainView.CLASSES.activeForm);
                this.form.showForm(this.state);
            break;
            case formCancelClick:
                event.preventDefault();
                this.cleanState();
                this.container.classList.toggle(RemindersMainView.CLASSES.activeForm);
                this.form.hideForm();
            break;
            case formCreateClick:
                event.preventDefault();
                this.cleanState();
                this.container.classList.toggle(RemindersMainView.CLASSES.activeForm);
                this.form.createNewReminder();
            break;
            case formEditClick:
                event.preventDefault();
                this.container.classList.toggle(RemindersMainView.CLASSES.activeForm);
                this.cleanState();
                this.form.editReminder();
            break;
            case formShowOptionsClick:
                this.form.showOrHideOptions();
            break;
            case formSelectOptionClick:
                this.form.setCategory(event);
            break;
            case formHideOptionsClick:
                this.form.showOrHideOptions();
            break;
            case listItemShowClick:
                this.list.showItemFullSize(event.target);
            break;
            case archiveListItemShowClick:
                this.archive.showItemFullSize(event.target);
                break;
            case listItemDeleteClick:
                this.list.deleteItem(event.target);
            break;
            case listItemArchiveClick:
                this.list.archiveItem(event.target);
            break;
            case listItemEditClick:
                this.container.classList.toggle(RemindersMainView.CLASSES.activeForm);
                const reminderId = this.list.getItemId(event.target);
                const reminder = this.reminders.find(reminder => +reminder.id === +reminderId);
                this.state.edit = true;
                this.form.showForm(this.state,reminder);
            break;
            case archiveListItemEditClick:
                this.archive.unArchiveItem(event.target);
            break;
        }
    }
    onKeyup(event){
        const createFormNameKeyup = this.form.validateNameKeyup(event.target);
        const createFormContentKeyup = this.form.validateContentKeyup(event.target);
        switch (true){
            case createFormNameKeyup:
                this.form.setNameState(event.target);
            break;
            case createFormContentKeyup:
                this.form.setContentState(event.target);
            break;
        }
    }
    renderComponent(root){
        root.innerHTML = this.createComponent();
    }
    returnReminderWithId(reminder){
        const remindersIds = this.reminders.map(elem => elem.id);
        let id = 0;
        do{
            id = Math.round(Math.random() * 10000000000);
        }while (remindersIds.includes(id))
        reminder.id = id;
        return reminder;
    }
    setEventListeners(){
        this.container.addEventListener('click',this.onClick.bind(this));
        this.container.addEventListener('keyup',this.onKeyup.bind(this));
    }
    sendReminders(){
        return this.reminders;
    }
    setViews(){
        this.header = new RemindersHeaderView(this.container.querySelector(`.${RemindersMainView.CLASSES.header}`));
        this.list = new RemindersListView(
            this.container.querySelector(`.${RemindersMainView.CLASSES.list}`),
            {
                getReminders: this.sendReminders.bind(this),
                deleteReminder: this.options.deleteReminder.bind(this),
                editReminder: this.options.editReminder.bind(this),
            }
        );
        this.archive = new RemindersArchiveView(
            this.container.querySelector(`.${RemindersMainView.CLASSES.archive}`),
            {
                getReminders: this.sendReminders.bind(this),
                unArchiveReminder: this.options.editReminder.bind(this),
            }
        );
        this.categories = new RemindersCategoriesView(this.container.querySelector(`.${RemindersMainView.CLASSES.categories}`));
        this.form = new RemindersFormView(
            this.container.querySelector(`.${RemindersMainView.CLASSES.form}`),
            {
                createNewReminder:this.createNewReminder.bind(this),
                editReminder: this.options.editReminder.bind(this),
            }
        );
    }
}