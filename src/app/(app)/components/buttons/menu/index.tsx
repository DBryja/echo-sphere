import "./button-menu.scss";
import React from "react";

interface MenuButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
  hidden?: boolean;
  style?: React.CSSProperties;
}

export default function MenuButton({ onClick, isMenuOpen, style }: MenuButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`header__menu menu-button ${isMenuOpen ? "active" : ""}`}
      style={style}
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
