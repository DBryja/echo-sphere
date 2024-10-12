import { Field } from "payload";

const colorHexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const colorField: Field = {
    name: "colorHEX",
    type: "text",
    admin: {
        components: {
            Field: {
                path: '/fields/ColorPickerInput/component',
                label: "Color HEX",
                required: true
            }
        },
    },
    validate: (value) => {
        if (!colorHexRegex.test(value)) return "Color must be a valid HEX value.";
        return true;
    },
    hooks: {
        beforeChange: [
            ({ value }) => {
                if (!value) return value;
                return value.replace("#", '').trim();
            }
        ]
    }
};

export default colorField;