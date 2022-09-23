import {categories} from "../../shared/consts/categories";

export default class RemindersFormView{
    static CLASSES = {
        disable: 'disable',
        container: 'form__container',
        header: 'form__header',
        cancel: 'form__cancel',
        submit: 'form__submit',
        title: 'form__title',
        content: 'form__content',
        newName: 'form__new-name',
        newContent: 'form__new-content',
        category: 'form__category',
        categoryContainer: 'category__container',
        categoryOptions: 'category__options',
        categoryOption: 'category__option',
        categorySelect: 'category__select',
        categoryColor: 'category__color',
    }
    categories = categories;
    defaultState = {
        name: '',
        created: null,
        category: this.categories[0].name,
        content: '',
        dates: [],
        archived: false,
    }
    state = null;
    target = {
        create: false,
        edit: false,
    };
    container = null;
    options = null;
    constructor(container,options) {
        this.init(container,options);
    }
    createComponent(){
        return `
            ${this.createHeader()}
            ${this.createContent()}
        `
    }
    createCategorySelect(){
        return `
            ${this.state.category}
            <span 
                class=${RemindersFormView.CLASSES.categoryColor}
                style="background-color: ${
                    this.categories
                        .find(category => category.name === this.state.category)
                        .color
                }"
            ></span>
        `
    }
    createContent(){
        return `
            <div class=${RemindersFormView.CLASSES.content}>
                <input 
                    type="text"
                    placeholder="Name"
                    class=${RemindersFormView.CLASSES.newName}
                >
                <textarea
                    class=${RemindersFormView.CLASSES.newContent}
                    placeholder="Content"
                ></textarea>
            </div>
            <div class='${RemindersFormView.CLASSES.category}'>
                <div class=${RemindersFormView.CLASSES.categoryContainer}>
                    Category
                    <div class=${RemindersFormView.CLASSES.categorySelect}>
                    </div>
                </div>
                <div class=${RemindersFormView.CLASSES.categoryOptions}>
                    ${this.categories.map(option => {
                        return `
                            <span class=${RemindersFormView.CLASSES.categoryOption}>
                                ${option.name}
                            </span>
                        `
                    }).join('')}
                </div>
            </div>
        `
    }
    createHeader(){
        return `
            <div class=${RemindersFormView.CLASSES.header}>
                <button class=${RemindersFormView.CLASSES.cancel}>Cancel</button>
                <h3 class=${RemindersFormView.CLASSES.title}>
                    ${this.target.create ? 'New reminder' : 'Edit reminder'}
                </h3>
                <button class=${RemindersFormView.CLASSES.submit}>
                    ${this.target.create ? 'Create': 'Edit'}
                </button>
            </div>
        `
    }
    createNewReminder(){
        this.validateDatesInContent(this.state.content);
        this.options.createNewReminder({
            ...this.state,
            created: this.getCreatedDate()
        });
        this.hideForm();
    }
    editReminder(){
        this.validateDatesInContent(this.state.content);
        this.options.editReminder(this.state)
        this.hideForm();
    }
    getCreatedDate(){
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
    deleteComponent(){
        this.container.innerHTML = '';
    }
    hideForm(){
        this.deleteComponent();
        this.toggleDisableStatus(this.container);
    }
    init(container,options){
        this.options = options;
        this.container = container;
        this.container.classList.toggle(RemindersFormView.CLASSES.container);
        this.toggleDisableStatus(this.container);
    }
    renderComponent(){
        this.container.innerHTML = this.createComponent();
        this.renderCategorySelect();
    }
    renderCategorySelect(){
        this.container.querySelector(`.${RemindersFormView.CLASSES.categorySelect}`)
            .innerHTML = this.createCategorySelect();
    }
    setCategory(event){
        this.showOrHideOptions();
        this.state.category = event.target.closest(`.${RemindersFormView.CLASSES.categoryOption}`).innerText;
        this.renderCategorySelect();
    }
    setNameState(input){
        this.state.name = input.value;
        this.validateReadyForCreateStatus();
    }
    setContentState(textarea){
        this.state.content = textarea.value;
        this.validateReadyForCreateStatus();
    }
    setValues(){
        const name = this.container.querySelector(`.${RemindersFormView.CLASSES.newName}`);
        const content = this.container.querySelector(`.${RemindersFormView.CLASSES.newContent}`);
        name.value = this.state.name;
        content.value = this.state.content;
    }
    showForm(target,reminder = null){
        this.target = target;
        this.setState(reminder);
        this.renderComponent();
        this.target.edit ? this.setValues() : null;
        this.target.create ? this.showOrHideCreateButton() : null;
        this.showOrHideOptions();
        this.toggleDisableStatus(this.container);
    }
    setState(reminder){
        this.target.create ? this.state = {...this.defaultState} : this.state = reminder;
    }
    showOrHideOptions(){
        this.toggleDisableStatus(this.container.querySelector(`.${RemindersFormView.CLASSES.categoryOptions}`))
    }
    showOrHideCreateButton(){
        this.toggleDisableStatus(this.container.querySelector(`.${RemindersFormView.CLASSES.submit}`))
    }
    toggleDisableStatus(element){
        element.classList.toggle(RemindersFormView.CLASSES.disable);
    }
    validateCancelClick(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.cancel}`);
    }
    validateSubmitClick(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.submit}`)
    }
    validateCreateClick(target){
        return this.validateSubmitClick(target) && this.target.create;
    }
    validateEditClick(target){
        return this.validateSubmitClick(target) && this.target.edit;
    }
    validateDatesInContent(content){
        const searchedDates = content.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g);
        // **/**/**** or */**/**** or **/*/**** or */*/****
        !!searchedDates ? this.state.dates = searchedDates.join(', ') : null;
    }
    validateDisableStatus(element){
        return [...element.classList].includes(RemindersFormView.CLASSES.disable);
    }
    validateShowOptionsClick(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.container} .${RemindersFormView.CLASSES.categoryContainer}`);
    }
    validateHideOptionsClick(target){
        const optionsElement = this.container.querySelector(`.${RemindersFormView.CLASSES.categoryOptions}`);
        const showedOptions = !this.validateDisableStatus(optionsElement);
        const categoryClick = !!target.closest(`.${RemindersFormView.CLASSES.container}  .${RemindersFormView.CLASSES.category}`)
        return !!(showedOptions && !categoryClick);
    }
    validateSelectOptionClick(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.categoryOption}`);
    }
    validateNameKeyup(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.newName}`);
    }
    validateRenderedForm(){
        return !!this.container.innerHTML;
    }
    validateContentKeyup(target){
        return !!target.closest(`.${RemindersFormView.CLASSES.newContent}`);
    }
    validateReadyForCreateStatus(){
        const createButton = this.container.querySelector(`.${RemindersFormView.CLASSES.submit}`);
        const hiddenButton = this.validateDisableStatus(createButton);
        const name = this.state.name;
        const content = this.state.content;
        const showCreateButton = !!name.trim() && !!content.trim() && hiddenButton;
        const hideCreateButton = (!name.trim() || !content.trim()) && !hiddenButton;
        switch (true){
            case showCreateButton:
                this.showOrHideCreateButton();
            break;
            case hideCreateButton:
                this.showOrHideCreateButton();
            break;
        }
    }
}