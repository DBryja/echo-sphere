import "./defaultButton.scss";
import {ReactNode} from "react";

interface DefaultButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function DefaultButton({children, onClick, className, disabled}: DefaultButtonProps) {
    return (
        <button onClick={onClick} className={`default-button ${className || ""}`} disabled={disabled}>
            {children}
        </button>
    );
}