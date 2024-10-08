import "./button-menu.scss";

export default function MenuButton() {
    return (
        <div className={"menu-button btn btn--small"} aria-roledescription={"button"} tabIndex={0}>
            <span className={""}>menu</span>
            <div className={"menu-button__dot "}>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
            </div>
        </div>
    )
}