import { RefObject, FC, forwardRef } from "react";
import Select, { components } from "react-select";
import SelectType from "react-select/dist/declarations/src/Select";
import { selectOption } from "../types/users";
export interface CustomSelectProps {
    options: selectOption[]
    onChange: (value: any) => void
    innerRef: RefObject<SelectType>
}

const customStyles = {
    indicatorSeparator: () => ({

    }),
    control: (provided: object) => ({
        ...provided,
        minHeight: '50px',
        height: '50px'
    }),
    dropdownIndicator: (provided: object) => ({
        ...provided,
        paddingRight: '14.5px',
    })
};

const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#006db7" d="M5.25752 8.9225L9.91252 13.5775C10.2384 13.9033 10.7659 13.9033 11.0909 13.5775L15.7459 8.9225C16.2709 8.3975 15.8992 7.5 15.1567 7.5H5.84669C5.10419 7.5 4.73252 8.3975 5.25752 8.9225Z" />
            </svg>
        </components.DropdownIndicator>
    );
};
const CustomSelect: FC<CustomSelectProps> = ({ options, onChange, innerRef, ...field }) => {
    return (
        <Select
            styles={customStyles}
            components={{ DropdownIndicator }}
            options={options}
            ref={innerRef}
            classNamePrefix={'react-select-prefix'}
            onChange={(val) => {
                onChange(val);
            }}
            {...field}
        />
    );
}

export default CustomSelect;