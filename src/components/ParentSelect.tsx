import { forwardRef } from 'react';
import CustomSelect from "./CustomSelect";
const ParentSelect = forwardRef<any, any>(({ ...rest }, ref) => {
    return (
        <CustomSelect
            innerRef={ref}
            {...rest}
        />
    );
});


export default ParentSelect;