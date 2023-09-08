import { useCallback } from "react";
import "./styles.scss";
import CustomButton from "../Button";
import { AddIcon } from "../../assets/svg";

export default function Actionbar() {
    const getGreeting = useCallback(() => {
        const today = new Date();
        const hour = today.getHours();
        if (hour < 12) {
            return "Good morning!";
        } else if (hour >= 12 && hour < 4) {
            return "Good afternoon!";
        } else {
            return "Good evening!";
        }
    }, []);

    return (
        <div className="action-bar container py-4 d-flex flex-row align-items-center justify-content-between">
            <div className="greeting">
                <h3>
                    {getGreeting()}
                </h3>

                <span>
                    You got some task to do.
                </span>
            </div>

            <CustomButton 
                title="Create New Task"
                leftIcon={<AddIcon />}
                onClick={() => {}}
            />
        </div>
    );
}