import { useEffect } from "react";
import { defaultAvatar } from "../../assets/images";
import { BellIcon, GearIcon } from "../../assets/svg";
import "./styles.scss";
import { logger } from "../../utils";

export default function Appbar() {
    useEffect(() => logger("Render Appbar"), []);

    return (
        <header className="app-bar">
            <div className="container d-flex flex-row justify-content-between align-items-center p-4">
                <h3 className="title">ToDo</h3>

                <div className={'actions d-none d-md-flex flex-row align-items-center'}>
                    <GearIcon />

                    <BellIcon />

                    <img src={defaultAvatar} alt="avatar" className="avatar" />
                </div>
            </div>
        </header>
    )
}