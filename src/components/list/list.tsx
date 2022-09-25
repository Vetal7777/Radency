import styles from './list.module.css';
import IListProps from "../../models/listProps";
import Item from "../item/item";

export default function List({title, columnsTitles,buttons = [],list}:IListProps):JSX.Element{
    const keys = columnsTitles.map(title => (title[0].toLowerCase() + title.substring(1)).replace(' ',''));
    return (
        <>
            <div className={styles.container}>
                <h2 children={title}/>
                <div className={styles.columns}>
                    {columnsTitles.map((columnTitle,index) => (
                        <span
                            key={index}
                            style={{
                                flexBasis: `calc( ( 100% - 20px - ( ${buttons.length} * 60px ) ) / ${columnsTitles.length} )`
                            }}
                            className={styles.column}
                            children={columnTitle}
                        />
                    ))}
                </div>
                <div className={styles.items}>
                    {list.map((item,key) => (
                        <Item
                            key={key}
                            item={item}
                            buttons={buttons}
                            keys={keys}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}