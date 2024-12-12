"use client";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "@app/utils";
import { TextInput } from "@payloadcms/ui";
import { useField } from "@payloadcms/ui";

const ColorPickerInput = ({
  path,
  label,
  required,
}: {
  path: string;
  label: "string";
  required: boolean;
}) => {
  const { value = "", setValue }: { value: string; setValue: any } = useField({
    path,
  });
  const [color, setColor] = useState<string>(value);

  useEffect(() => {
    if (value !== color) setColor(value);
  }, [value, color]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setColor(newValue);
    debouncedSetValue(newValue);
  };

  // Create a debounced version of setValue using useCallback to preserve reference
  // eslint-disable-next-line
  const debouncedSetValue = useCallback(debounce(setValue, 300), [setValue]);

  return (
    <div className="field-type text">
      <label htmlFor={path} className="field-label">
        {label ? label : "Color Hex"}
        {required && <span className="required">*</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextInput
          path={path}
          // name={path}
          value={color.startsWith("#") ? color : `#${color}`}
          onChange={setValue}
          placeholder="#FF00FF"
          style={{ width: "120px" }}
          label={label}
        />
        <input
          type="color"
          value={color.startsWith("#") ? color : `#${color}`}
          onChange={handleInputChange}
          style={{
            width: "40px",
            height: "40px",
            padding: 0,
            border: "none",
            alignSelf: "end",
          }}
        />
      </div>
    </div>
  );
};

export default ColorPickerInput;
