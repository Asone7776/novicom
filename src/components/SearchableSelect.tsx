import { forwardRef } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { axiosAuth } from '../axios-instances';

interface ResponseData {
    data: AddressData[]
}
interface SelectResponse {
    data: ResponseData
}
interface AddressData {
    name: string
    fias_id: string
    kladr_id: string
}
interface SearchableSelectProps {
    onChange: (newValue: SingleValue<AddressData>) => void
}
const promiseOptions = async (inputValue: string) => {
    try {
        const response: SelectResponse = await axiosAuth.get('/address/list', {
            params: {
                query: inputValue ? inputValue : null
            }
        });
        return response.data.data;
    } catch (error) {
        if (error) {
            // console.log(error);
        }
        return [];
    }

}

const SearchableSelect = forwardRef<any, SearchableSelectProps>(({ onChange, ...rest }, ref) => {
    const handleChange = (newValue: SingleValue<AddressData>) => {
        onChange(newValue);
    };
    return (
        <AsyncSelect
            onChange={handleChange}
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            isClearable={true}
            noOptionsMessage={() => 'Введите искомое значение'}
            getOptionLabel={(option) => option.name}
            placeholder="Введите адрес"
            loadingMessage={() => 'Поиск...'}
            classNamePrefix={'react-select-prefix'}
            ref={ref}
            {...rest}
        />
    );
});

export default SearchableSelect;