import ItemI from "./item";
import ButtonI from "./button";
import ReminderI from "./reminder";

interface IListProps {
    title: string,
    columnsTitles: string[],
    buttons?: [] | ButtonI[]
    list: [] | ItemI[] | ReminderI[],
}

export default IListProps;