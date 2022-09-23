import RemindersMainView from "./views/mainView";
import RemindersModel from "./model";

export default class RemindersController {
    view = null;
    model = null;
    reminders = null;
    constructor(root) {
        this.init(root);
    }
    async init(root){
        this.model = new RemindersModel;
        await this.getReminders();
        this.view = await new RemindersMainView(
            root,
            {
                createNewReminder:this.createNewReminder.bind(this),
                deleteReminder: this.deleteReminder.bind(this),
                editReminder: this.editReminder.bind(this),
            }
        );
        await this.updateRemindersState();
    }
    createNewReminder(reminder){
        this.model.add(reminder)
            .then(newReminder => {
                this.reminders = [...this.reminders,newReminder];
                this.updateRemindersState();
            })
    }
    deleteReminder(id){
        this.model.delete(id)
            .then(status => {
                if (status.status >=200 && status.status < 300){
                    this.reminders = this.reminders.filter(reminder => +reminder.id !== +id);
                    this.updateRemindersState();
                }
            })
    }
    async getReminders(){
        this.reminders = await this.model.get();
    }
    editReminder(editedReminder){
        this.model.edit(+editedReminder.id,editedReminder)
            .then(r => {
                this.reminders = this.reminders.map(reminder => +reminder.id === +editedReminder.id ? editedReminder : reminder);
                this.updateRemindersState();
            })
    }
    updateRemindersState(){
        this.view.getRemindersState(this.reminders);
    }
}