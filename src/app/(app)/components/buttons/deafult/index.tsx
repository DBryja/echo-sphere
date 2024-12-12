import "./defaultButton.scss";
import { ReactNode } from "react";

interface DefaultButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  color?: "black" | "white";
}

export default function DefaultButton({
  children,
  onClick,
  className,
  disabled,
  color = "black",
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`default-button default-button--${color} ${className || ""}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
