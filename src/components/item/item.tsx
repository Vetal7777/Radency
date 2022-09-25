import styles from './item.module.css'
import ItemPropsI from "../../models/itemProps";
import {categories} from "../../shared/consts/categories";
import ReminderI from "../../models/reminder";
import ItemI from "../../models/item";
import {useState} from "react";
import ItemCategory from "../item-category/item-category";

export default function Item({item,buttons,keys}: ItemPropsI):JSX.Element{
    const [fullSize,setFullSize] = useState(false)
    function isReminder(object: ItemI | ReminderI) : object is ReminderI {
        return 'id' in object;
    }
    const itemCategoryColor = categories.find((category) => category.name === item.category)?.color as string;
    return (
        <>
            <div
                className={`${styles.container} ${fullSize ? styles.fullSize : ''}`}
            >
                <ItemCategory color={itemCategoryColor}/>
                { keys.map((key,index) => (
                    <div
                        onClick={!!buttons.length ? () => setFullSize(!fullSize) : undefined}
                        style={{flexBasis: `calc( ( 100% - 20px - ( ${buttons.length} * 60px ) ) / ${keys.length} )`}}
                        className={styles.content}
                        key={index}
                        children={isReminder(item) ? item[key as keyof ReminderI] : item[key as keyof ItemI]}
                    />
                ))}
                {!!buttons.length && isReminder(item) && (
                    buttons.map((button,index) => (
                        <button
                            className={styles.button}
                            onClick={() => button.submit(item.id)}
                            key={index}
                            children={button.title}
                        />
                    ))
                )}
            </div>
        </>
    )
}