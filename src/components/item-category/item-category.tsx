import styles from './item-category.module.css';

export default function ItemCategory({color}:{color:string}){
    return (
        <>
            <div className={styles.container}>
                    <span
                        style={{backgroundColor: `${color}`}}
                        className={styles.cycle}
                    />
            </div>
        </>
    )
}