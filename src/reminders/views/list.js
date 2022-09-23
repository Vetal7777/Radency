import {listColumns} from "../../shared/consts/list-columns";
import {categories} from "../../shared/consts/categories";

export default class RemindersListView{
    static CLASSES = {
        container: 'list__container',
        columns: 'list__columns',
        column: 'list__column',
        items: 'list__items',
        item: 'list__item',
        edit: 'list__edit',
        delete: 'list__delete',
        archive: 'list__archive',
        itemControl: 'list__item-control',
        itemCategory: 'list__item-category',
        itemCategoryContainer: 'list__item-category-container',
        content: 'list__content',
        fullSize: 'full-size',
    }
    reminders = null;
    columns = listColumns;
    categories = categories;
    container = null;
    options = null;
    constructor(container,options) {
        this.init(container,options);
    }
    archiveItem(target){
        const selectedItemId = this.getItemId(target);
        const selectedItem = this.reminders.find(reminder => reminder.id === selectedItemId);
        this.options.editReminder({...selectedItem,archived: true});
    }
    createComponent(){
        return `
            <h2>Reminders</h2>
            <div class=${RemindersListView.CLASSES.columns}>
                ${this.createColumns()}
            </div>
            <div class=${RemindersListView.CLASSES.items}>
                ${this.createList()}
            </div>
        `;
    }
    createColumns(){
        return this.columns.map(column => {
            return `
                <span 
                    class=${RemindersListView.CLASSES.column}
                    style="flex-basis: calc(${100 / this.columns.length}% - ${150 / this.columns.length}px)"
                >
                    ${column}
                </span>`
        }).join('')
    }
    createList(){
        this.updateReminders();
        return this.reminders
            .map(reminder => {
            return this.createItem(reminder)
        }).join('')
    }
    createItem(reminder){
        const categoryColor = this.categories.find(category => category.name === reminder.category).color;
        const sortedReminder = this.sortedReminder(reminder)
        return `
            <div class=${RemindersListView.CLASSES.item} id='list-item__${reminder.id}'>
                <div class=${RemindersListView.CLASSES.itemCategoryContainer}>
                    <span   
                        class=${RemindersListView.CLASSES.itemCategory}
                        style="background-color: ${categoryColor}"
                    ></span>
                </div>
                ${Object.values(sortedReminder).map(content => {
                    return `
                        <span 
                            style="flex-basis: calc(${100 / this.columns.length}% - ${150 / this.columns.length}px)"
                            class=${RemindersListView.CLASSES.content}
                        >${content}</span>`
                }).join('')}
                <div class=${RemindersListView.CLASSES.itemControl}>
                    <button class=${RemindersListView.CLASSES.edit}>Edit</button>
                    <button class=${RemindersListView.CLASSES.archive}>Archive</button>
                    <button class=${RemindersListView.CLASSES.delete}>Delete</button>
                </div>
            </div>`
    }
    deleteItem(target){
        const selectedItemId = this.getItemId(target);
        this.options.deleteReminder(selectedItemId);
    }
    getItemId(target){
        return +target.closest(`.${RemindersListView.CLASSES.item}`).id.replace('list-item__','');
    }
    getRemindersState(reminders){
        this.reminders = reminders;
        this.renderComponent();
    }
    init(container,options){
        this.options = options;
        this.container = container;
        this.container.classList.toggle(RemindersListView.CLASSES.container);
    }
    renderComponent(){
        this.container.innerHTML = this.createComponent();
    }
    sortedReminder(reminder){
        return this.columns.map(column => reminder[column.toLowerCase()])
    }
    showItemFullSize(target){
        target
            .closest(`.${RemindersListView.CLASSES.item}`)
            .classList.toggle(RemindersListView.CLASSES.fullSize);
    }
    updateReminders(){
        this.reminders = this.options.getReminders()
            .filter(reminder => !reminder.archived);
    }
    validateItemDeleteClick(target){
        return !!target.closest(`.${RemindersListView.CLASSES.delete}`);
    }
    validateItemShowClick(target){
        const showItem = !!target.closest(`.${RemindersListView.CLASSES.item}`)
            && !target.closest(`.${RemindersListView.CLASSES.archive}`)
            && !target.closest(`.${RemindersListView.CLASSES.delete}`)
            && !target.closest(`.${RemindersListView.CLASSES.edit}`);
        return showItem;
    }
    validateItemArchiveClick(target){
        return !!target.closest(`.${RemindersListView.CLASSES.archive}`);
    }
    validateItemEditClick(target){
        return !!target.closest(`.${RemindersListView.CLASSES.edit}`);
    }
}