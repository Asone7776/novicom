import { FC } from "react";
import Select, { components } from "react-select";
import { selectOption } from "../types/users";
interface FilterSelectProps {
    options: selectOption[]
    onChange: (value: any) => void
}
const initialValue: selectOption = {
    label: 'Все',
    value: null
}
const customStyles = {
    indicatorSeparator: () => ({

    }),
    control: (provided: object) => ({
        ...provided,
        border: 'none'
    }),
    dropdownIndicator: (provided: object) => ({
        ...provided,
        paddingRight: '14.5px'
    }),
    valueContainer: (provided: object) => ({
        ...provided,
    }),
    indicatorsContainer: (provided: object) => ({
        ...provided,
    }),
    input: (provided: object) => ({
        ...provided,
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
const FilterSelect: FC<FilterSelectProps> = ({ options, onChange, ...props }) => {
    return (
        <Select
            styles={customStyles}
            className={'filter-select'}
            classNamePrefix={'react-select-prefix'}
            components={{ DropdownIndicator }}
            options={options}
            isSearchable={false}
            defaultValue={initialValue}
            placeholder={'Статус'}
            onChange={(val) => {
                onChange(val);
            }}
            {...props}
        />
    );
}

export default FilterSelect;