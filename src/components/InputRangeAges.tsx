import { forwardRef, useEffect, useState, ChangeEvent } from 'react';
import { formatPrice, declOfNum } from '../functions';
import {textForms} from '../constants';

interface InputRangeProps {
    suffix: string
    needToFormat: boolean
    min: string | number
    max: string | number
    onChange: (event: ChangeEvent) => void
    defaultValue: number
    step: string
}

const InputRangeAges = forwardRef<any, InputRangeProps>(({ needToFormat, min, max, onChange, defaultValue, step, ...rest }, ref) => {
    const [currentValue, setCurrentValue] = useState<string | number>('100%');
    const [bgSize, setBgSize] = useState<string | number>(0);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        changeBg(Number(value));
        setCurrentValue(value);
        onChange(event);
    }
    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue);
            changeBg(Number(defaultValue));
        }
    }, [defaultValue]);
    const changeBg = (val: number) => {
        setBgSize((val - Number(min)) * 100 / (Number(max) - Number(min)) + '% 100%');
    }
    return (
        <div className='custom-range-input'>
            <input step={step ? step : '1'} onChange={handleChange} style={{ backgroundSize: bgSize }} value={currentValue} type="range" min={min} max={max} ref={ref} {...rest} />
            <div className="values d-flex justify-content-between">
                <div className="left">{`${needToFormat ? formatPrice(min) : min} ${declOfNum(Number(min), textForms)}`}</div>
                <div className="center">{`${needToFormat ? formatPrice(currentValue) : currentValue} ${declOfNum(Number(currentValue), textForms)}`}</div>
                <div className="right">{`${needToFormat ? formatPrice(max) : max} ${declOfNum(Number(max), textForms)}`}</div>
            </div>
        </div>
    );
});
export default InputRangeAges;