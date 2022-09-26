import styles from './create-start-button.module.css'
import {useDispatch} from "react-redux";
import {formSlice} from "../../store/reducers/formSlice";

export default function CreateStartButton(){
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={styles.button}
                onClick={() => dispatch(formSlice.actions.showCreateForm())}
            >
                <span className={styles.line}/>
                <span className={styles.line}/>
            </button>
        </>
    )
}