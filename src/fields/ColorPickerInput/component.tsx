"use client";
import React, { useState, useEffect, useCallback } from "react";
import { TextInput } from "@payloadcms/ui";
import { useField } from "@payloadcms/ui";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ColorPickerInput = ({ path, label, required }) => {
  const { value = "", setValue } = useField({ path });
  const [color, setColor] = useState(value);

  useEffect(() => {
    if (value !== color) setColor(value);
  }, [value, color]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setColor(newValue);
    debouncedSetValue(newValue);
  };

  // Create a debounced version of setValue using useCallback to preserve reference
  const debouncedSetValue = useCallback(debounce(setValue, 300), []);

  return (
    <div className="field-type text">
      <label htmlFor={path} className="field-label">
        {label ? label : "Color Hex"}
        {required && <span className="required">*</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextInput
          path={path}
          name={path}
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
