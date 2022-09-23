import {listColumns} from "../../shared/consts/list-columns";
import {categories} from "../../shared/consts/categories";

export default class RemindersArchiveView{
    static CLASSES = {
        container: 'archive-list__container',
        columns: 'archive-list__columns',
        column: 'archive-list__column',
        items: 'archive-list__items',
        item: 'archive-list__item',
        edit: 'archive-list__edit',
        itemControl: 'archive-list__item-control',
        itemCategory: 'archive-list__item-category',
        itemCategoryContainer: 'archive-list__item-category-container',
        content: 'archive-list__content',
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
    unArchiveItem(target){
        const selectedItemId = this.getItemId(target);
        const selectedItem = this.reminders.find(reminder => reminder.id === selectedItemId);
        this.options.unArchiveReminder({...selectedItem,archived: false});
    }
    createComponent(){
        return `
            <h2>Archive</h2>
            <div class=${RemindersArchiveView.CLASSES.columns}>
                ${this.createColumns()}
            </div>
            <div class=${RemindersArchiveView.CLASSES.items}>
                ${this.createList()}
            </div>
        `;
    }
    createColumns(){
        return this.columns.map(column => {
            return `
                <span 
                    class=${RemindersArchiveView.CLASSES.column}
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
            <div class=${RemindersArchiveView.CLASSES.item} id='archive-list-item__${reminder.id}'>
                <div class=${RemindersArchiveView.CLASSES.itemCategoryContainer}>
                    <span   
                        class=${RemindersArchiveView.CLASSES.itemCategory}
                        style="background-color: ${categoryColor}"
                    ></span>
                </div>
                ${Object.values(sortedReminder).map(content => {
                    return `
                        <span 
                            style="flex-basis: calc(${100 / this.columns.length}% - ${150 / this.columns.length}px)"
                            class=${RemindersArchiveView.CLASSES.content}
                        >${content}</span>`
                }).join('')}
                <div class=${RemindersArchiveView.CLASSES.itemControl}>
                    <button 
                        class=${RemindersArchiveView.CLASSES.edit}
                        style="flex-grow: 1"
                    >Unarchive</button>
                </div>
            </div>`
    }
    getItemId(target){
        return +target.closest(`.${RemindersArchiveView.CLASSES.item}`).id.replace('archive-list-item__','');
    }
    getRemindersState(reminders){
        this.reminders = reminders;
        this.renderComponent();
    }
    init(container,options){
        this.options = options;
        this.container = container;
        this.container.classList.toggle(RemindersArchiveView.CLASSES.container);
    }
    renderComponent(){
        this.container.innerHTML = this.createComponent();
    }
    sortedReminder(reminder){
        return this.columns.map(column => reminder[column.toLowerCase()])
    }
    showItemFullSize(target){
        target
            .closest(`.${RemindersArchiveView.CLASSES.item}`)
            .classList.toggle(RemindersArchiveView.CLASSES.fullSize);
    }
    updateReminders(){
        this.reminders = this.options.getReminders()
            .filter(reminder => reminder.archived);
    }
    validateItemShowClick(target){
        const showItem = !!target.closest(`.${RemindersArchiveView.CLASSES.item}`)
            && !target.closest(`.${RemindersArchiveView.CLASSES.edit}`);
        return showItem;
    }
    validateItemUnArchiveClick(target){
        return !!target.closest(`.${RemindersArchiveView.CLASSES.edit}`);
    }
}