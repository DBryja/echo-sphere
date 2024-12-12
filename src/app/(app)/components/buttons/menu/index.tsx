import "./button-menu.scss";

interface MenuButtonProps {
  hidden?: boolean;
  onClick: () => void;
  isMenuOpen: boolean;
}

export default function MenuButton({ onClick, isMenuOpen }: MenuButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`header__menu menu-button ${isMenuOpen ? "active" : ""}`}
      aria-roledescription={"button"}
      tabIndex={0}
    >
      <span className={""}>menu</span>
      <div className={"menu-button__dot "}>
        <div className={"menu-button__dot__item"}></div>
        <div className={"menu-button__dot__item"}></div>
        <div className={"menu-button__dot__item"}></div>
      </div>
    </div>
  );
}
