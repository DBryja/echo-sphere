import ColorPickerInput from './component';

const colorHexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const colorField = {
    name: "colorHEX",
    type: "text",
    admin: {
        components: {
            Field: ColorPickerInput,
        },
    },
    validate: (value) => {
        if (!colorHexRegex.test(value)) return "Color must be a valid HEX value.";
        return true;
    },
    hooks: {
        beforeChange: [
            ({ value }) => {
                return value.replace("#", '').trim();
            }
        ]
    }
};

export default colorField;