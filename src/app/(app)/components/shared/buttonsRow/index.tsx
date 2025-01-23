import React from "react";
import Button from "@components/buttons/deafult";
import Link from "@components/Link";
import "./buttonsRow.scss";

interface ButtonsRowProps {
  primaryLink?: string | null;
  primaryText?: string | null;
  secondaryLink?: string | null;
  secondaryText?: string | null;
  className?: string;
  reverse?: boolean;
}

const ButtonsRow: React.FC<ButtonsRowProps> = ({
  primaryLink,
  primaryText,
  secondaryLink,
  secondaryText,
  className = "",
  reverse = false,
}) => {
  if (reverse) {
    return (
      <div className={`buttonsRow ${className}`}>
        {secondaryLink && (
          <Button className={"buttonsRow__button"} color={"black"}>
            <Link href={secondaryLink}>{secondaryText}</Link>
          </Button>
        )}
        {primaryLink && (
          <Button className={"buttonsRow__button"} color={"white"}>
            <Link href={primaryLink}>{primaryText}</Link>
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className={`buttonsRow ${className}`}>
      {primaryLink && (
        <Button className={"buttonsRow__button"} color={"white"}>
          <Link href={primaryLink}>{primaryText}</Link>
        </Button>
      )}
      {secondaryLink && (
        <Button className={"buttonsRow__button"} color={"black"}>
          <Link href={secondaryLink}>{secondaryText}</Link>
        </Button>
      )}
    </div>
  );
};

export default ButtonsRow;
