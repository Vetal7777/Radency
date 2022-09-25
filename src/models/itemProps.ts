import ButtonI from "./button";
import ItemI from "./item";
import ReminderI from "./reminder";

interface ItemPropsI{
    buttons: ButtonI[] | [],
    item: ItemI | ReminderI,
    keys: string[]
}

export default ItemPropsI;