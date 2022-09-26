import styles from './error-message.module.css'
import {useAppSelector} from "../../hooks/redux";

export default function ErrorMessage(){
    const error = useAppSelector(state => state.reminderSlice.error);
    return (
        <>
            <div className={styles.container}>
                <div className={styles.error}>
                    <span className={styles.cycle}>!</span>
                    {error}
                </div>
            </div>
        </>
    )
}