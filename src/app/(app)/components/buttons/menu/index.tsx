import "./button-menu.scss";

export default function MenuButton({hidden=true}: {hidden?: boolean}) {
    return (
        <div
            style={{opacity: hidden?0:1, visibility: hidden?"visible":"hidden"}}
            className={"header__menu menu-button btn btn--small"} aria-roledescription={"button"} tabIndex={0}>
            <span className={""}>menu</span>
            <div className={"menu-button__dot "}>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
            </div>
        </div>
    )
}