export default class RemindersHeaderView{
    static CLASSES = {
        createButton: 'create-button',
        createButtonLine: 'create-button__line'
    }
    container = null;
    constructor(container) {
        this.init(container);
    }
    createComponent(){
        return `
                <button class=${RemindersHeaderView.CLASSES.createButton}>
                    <span class=${RemindersHeaderView.CLASSES.createButtonLine}></span>
                    <span class=${RemindersHeaderView.CLASSES.createButtonLine}></span>
                </button>
        `
    }
    init(container){
        this.container = container;
        this.renderComponent();
    }
    renderComponent(){
        this.container.innerHTML = this.createComponent();
    }
    validateShowFormClick(target){
        return !!target.closest(`.${RemindersHeaderView.CLASSES.createButton}`);
    }
}