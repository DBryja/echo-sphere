import React from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  label?: string;
  inputType?: "input" | "textarea";
}

export default function Input({
  wrapperClassName = "",
  inputType = "input",
  label,
  ...props
}: InputProps) {
  return (
    <div className={"input input__wrapper " + wrapperClassName}>
      {label && <label className={"input__label"}>{label}</label>}
      {inputType === "textarea" ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={"input__field"}
        />
      ) : (
        <input {...props} className={"input__field"} />
      )}
    </div>
  );
}
