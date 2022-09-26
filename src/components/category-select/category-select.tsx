import styles from './category-select.module.css';
import ItemCategory from "../item-category/item-category";
import {categories} from "../../shared/consts/categories";

export default function CategorySelect({value,optionsState,onSelectOption}:{value:string,optionsState: boolean,onSelectOption: (categoryName:string) => void}){
    const categoryColor = categories.find(category => category.name === value)?.color;
    return (
        <>
            <div className={styles.container}>
                {value}
                <ItemCategory color={categoryColor as string}/>
            </div>
            <div className={`${styles.options} ${!optionsState ? styles.disable : ''}`}>
                {categories.map((category,index) => (
                    <span
                        key={index}
                        className={styles.option}
                        children={category.name}
                        onClick={() => onSelectOption(category.name)}
                    />
                ))}
            </div>
        </>
    )
}