import { ChangeEvent, FC, useState, forwardRef } from "react";
import FilterSelect from "./FilterSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { withDebounce } from '../functions';
import { setDefaultLocale } from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { selectOption } from "../types/users";
import CalendarIcon from '../img/calendar.svg';
setDefaultLocale('ru');
type DateInterface = Date | null;

interface OrderFiltersProps {
    users: selectOption[] | []
    onFilterChange: (param: string, value: any) => void
    onDateRange: (name: string, value: Date | null) => void
}
const OrderFilters: FC<OrderFiltersProps> = ({ users, onFilterChange, onDateRange }) => {
    const [startDate, setStartDate] = useState<DateInterface>(null);
    const [endDate, setEndDate] = useState<DateInterface>(null);

    const statuses = [
        { value: null, label: 'Все полисы' },
        { value: -1, label: 'Отменено' },
        { value: 0, label: 'Не оплачено' },
        { value: 3, label: 'Оплачено' },
    ];
    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        if (search.length >= 3 || search.length === 0) {
            withDebounce(() => {
                onFilterChange("search", search ? search : null);
            });
        }
    };
    return (
        <div className="order-filters small-gutters">
            <div className="row mb-3">
                <div className="col-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 2C5.14585 2 2 5.14585 2 9C2 12.8541 5.14585 16 9 16C10.748 16 12.345 15.348 13.5742 14.2812L14 14.707V16L20 22L22 20L16 14H14.707L14.2812 13.5742C15.348 12.345 16 10.748 16 9C16 5.14585 12.8541 2 9 2ZM9 4C11.7733 4 14 6.22673 14 9C14 11.7733 11.7733 14 9 14C6.22673 14 4 11.7733 4 9C4 6.22673 6.22673 4 9 4Z" fill="black" />
                                </svg>
                            </span>
                        </div>
                        <input onChange={onSearchChange} type="text" className="form-control" placeholder="Поиск" />
                    </div>
                </div>
                <div className="col-4">
                    <FilterSelect options={statuses} onChange={(val) => {
                        onFilterChange('status', val.value);
                    }} />
                </div>
                <div className="col-lg-4 col-md-12 mt-3 mt-lg-0">
                    <div className="custom-calendar">
                        <div className="icon-wrapper">
                            <img src={CalendarIcon} alt="calendaricon" />
                        </div>
                        <div className="picker-wrapper">
                            <span>от</span>
                            <DatePicker
                                locale={ru}
                                selected={startDate}
                                dateFormat="dd.MM.yy"
                                onChange={(date) => {
                                    onDateRange('from', date);
                                    setStartDate(date);
                                }}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="delimetr"></div>
                        <div className="picker-wrapper">
                            <span style={{ marginLeft: 10 }}>до</span>
                            <DatePicker
                                locale={ru}
                                selected={endDate}
                                dateFormat="dd.MM.Y"
                                onChange={(date) => {
                                    onDateRange('to', date);
                                    setEndDate(date);
                                }}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <FilterSelect
                        placeholder={'Пользователи'}
                        isMulti
                        options={users} onChange={(val) => {
                            let valueToSend = null
                            if (val.length > 0) {
                                valueToSend = val.map((item: selectOption) => item.value).join();
                            }
                            onFilterChange('users', valueToSend);
                        }} />
                </div>
            </div>
        </div>
    );
}

export default OrderFilters;