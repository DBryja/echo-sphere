import "./button-menu.scss";

interface MenuButtonProps {
    hidden?: boolean;
    onClick: ()=>void;
    isMenuOpen: boolean;
}

export default function MenuButton({hidden=true, onClick, isMenuOpen}: MenuButtonProps) {
    return (
        <div
            onClick={onClick}
            style={{opacity: hidden?0:1, visibility: hidden?"visible":"hidden"}}
            className={`header__menu menu-button btn btn--small ${isMenuOpen?"active":""}`} aria-roledescription={"button"} tabIndex={0}>
            <span className={""}>menu</span>
            <div className={"menu-button__dot "}>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
                <div className={"menu-button__dot__item"}></div>
            </div>
        </div>
    )
}