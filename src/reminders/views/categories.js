import {categoriesColumns} from "../../shared/consts/categories-columns";
import {categories} from "../../shared/consts/categories";

export default class RemindersCategoriesView{
    static CLASSES = {
        container: 'categories__container',
        columns: 'categories__columns',
        column: 'categories__column',
        items: 'categories__items',
        item: 'categories__item',
        remindersList: 'categories__reminders-list',
        show: 'categories__show',
        content: 'categories__content',
        itemCategory: 'categories__item-category',
        itemCategoryContainer: 'categories__item-category-container',
        active: 'active',
    }
    reminders = null;
    categories = categories;
    container = null;
    columns = categoriesColumns;
    constructor(container) {
        this.init(container);
    }
    createColumns(){
        return this.columns.map(column => {
            return `
                <span 
                    class=${RemindersCategoriesView.CLASSES.column}
                    style="flex-basis: calc(${100 / this.columns.length}% - ${60 / this.columns.length}px)"
                >
                    ${column}
                </span>`
        }).join('')
    }
    createComponent(){
        return `
            <h2>Categories</h2>
            <div class=${RemindersCategoriesView.CLASSES.columns}>
                ${this.createColumns()}
            </div>
            <div class=${RemindersCategoriesView.CLASSES.items}>
                ${this.createList()}
            </div>
        `;
    }
    createItem(category){
        const sortedCategory = this.sortedCategory(category);
        const categoryColor = this.categories.find(elem => elem.name === category.name).color;
        return `
                <div class=${RemindersCategoriesView.CLASSES.item}>
                    <div class=${RemindersCategoriesView.CLASSES.itemCategoryContainer}>
                    <span   
                        class=${RemindersCategoriesView.CLASSES.itemCategory}
                        style="background-color: ${categoryColor}"
                    ></span>
                    </div>
                    ${Object.values(sortedCategory).map(content => {
                        return `
                            <span 
                                style="flex-basis: calc(${100 / this.columns.length}% - ${60 / this.columns.length}px)"
                                class=${RemindersCategoriesView.CLASSES.content}
                            >${content}</span>`
                    }).join('')}
                </div>
        `
    }
    createList(){
        const list = this.categories.map(category => {
            return {
                name: category.name,
                reminders: this.reminders.filter(reminder => reminder.category === category.name),
                active: this.reminders.filter(reminder => (reminder.category === category.name ) && (reminder.archived === false)),
                archived: this.reminders.filter(reminder => (reminder.category === category.name ) && (reminder.archived === true)),
            }
        });
        return list
            .map(category => {
                return this.createItem(category)
            }).join('')
    }
    getRemindersState(reminders){
        this.reminders = reminders;
        this.renderComponent();
    }
    init(container){
        this.container = container;
        this.container.classList.toggle(RemindersCategoriesView.CLASSES.container);
    }
    renderComponent(){
        this.container.innerHTML = this.createComponent();
    }
    sortedCategory(category){
        return this.columns.map(column => {
            if(column === 'Note Category'){
                return category.name;
            }else{
                return category[column.toLowerCase()].length;
            }
        })
    }
}