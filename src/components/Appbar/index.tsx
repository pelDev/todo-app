import { useEffect } from "react";
import { defaultAvatar } from "../../assets/images";
import { BellIcon, GearIcon, MenuIcon } from "../../assets/svg";
import "./styles.scss";
import { logger } from "../../utils";
import CustomIconButton from "../IconButton";

export default function Appbar() {
    useEffect(() => logger("Render Appbar"), []);

    return (
        <header className="app-bar">
            <div className="container d-flex flex-row justify-content-between align-items-center p-4 pt-5 pt-md-4">
                <h3 className="title">ToDo</h3>

                <div className={'actions d-none d-md-flex flex-row align-items-center'}>
                    <GearIcon />

                    <BellIcon />

                    <img src={defaultAvatar} alt="avatar" className="avatar" />
                </div>

                <div className="menu d-flex d-md-none justify-content-end">
                    <CustomIconButton >
                        <MenuIcon />
                    </CustomIconButton>
                </div>
            </div>
        </header>
    )
}