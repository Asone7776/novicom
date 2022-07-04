import React from 'react';
import CustomCreateableSelect from './CustomCreateableSelect';
const ParentCreateSelect = React.forwardRef<any, any>(({ ...rest }, ref) => {
    return (
        <CustomCreateableSelect
            innerRef={ref}
            {...rest}
        />
    );
});

export default ParentCreateSelect;