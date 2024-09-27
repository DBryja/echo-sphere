"use client";
import React, { useState, useEffect } from 'react';
import {Text} from '@payloadcms/ui/dist/fields/Text';
import {useField} from "@payloadcms/ui/dist/forms/useField";

const ColorPickerInput = ({ path, label, required }) => {
    const { value = '', setValue } = useField({ path });
    const [color, setColor] = useState(value);

    useEffect(() => {
        setColor(value);
    }, [value]);

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setColor(newValue);
        setValue(newValue.replace("#", '').trim());
    };

    const handleColorChange = (e) => {
        const newValue = e.target.value;
        setColor(newValue);
        setValue(newValue.replace("#", '').trim());
    };

    return (
        <div className="field-type text">
            <label htmlFor={path} className="field-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Text
                    path={path}
                    name={path}
                    value={color}
                    onChange={handleInputChange}
                    placeholder="#FF00FF"
                    style={{ width: '120px' }}
                />
                <input
                    type="color"
                    value={color.startsWith('#') ? color : `#${color}`}
                    onChange={handleColorChange}
                    style={{ width: '40px', height: '40px', padding: 0, border: 'none' }}
                />
                <div
                    style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color.startsWith('#') ? color : `#${color}`,
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                />
            </div>
        </div>
    );
};

export default ColorPickerInput;