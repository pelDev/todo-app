import { BellIcon, CloseIcon } from "../../assets/svg";
import CustomIconButton from "../IconButton";

export default function ReminderTile() {
    return (
        <div className="reminder-tile w-100 d-flex flex-row align-items-center">
            <BellIcon />

            <div>10 Minute before</div>

            <CustomIconButton className="close ms-auto">
                <CloseIcon />
            </CustomIconButton>
        </div>
    );
}