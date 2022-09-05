import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import ParentSelect from './ParentSelect';
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import InputRange from './InputRange';
import InputRangeAges from './InputRangeAges';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createFormData } from '../types/polices';
import DateSelect from './DateSelect';
import moment from 'moment';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetSaveSuccess } from '../redux/slices/policeSlice';
import SearchableSelect from './SearchableSelect';
import { savePolicy } from '../redux/actions/policeActions';

const CreateForm = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const police = useAppSelector(state => state.police.savedPolicy);
    const maleOptions = [
        { value: '1', label: 'Мужской' },
        { value: '2', label: 'Женский' }
    ];
    const { control, getValues, setValue, watch, register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        defaultValues: {
            sum: 2000000,
            years: 4,
            male: { value: '1', label: 'Мужской' },
            phone: "+7(___)___-__-__"
        }
    });

    const savedFields = watch(['sum', 'surname', 'first_name', 'second_name', 'years']);

    useEffect(() => {
        if (police.success) {
            dispatch(resetSaveSuccess());
            navigate('/admin/new/complete?fromEdit=true');
        }
    }, [police]);

    const onSubmit = (data: createFormData) => {
        const tariff = searchParams.get('tariff');
        const objectToSend = {
            ...data,
            tariff: tariff ? tariff : 1,
            male: data.male.value,
            birthday: data.birthday ? moment(data.birthday).format('Y-MM-DD') : null,
            credit_date: data.credit_date ? moment(data.credit_date).format('DD.MM.Y') : null,
            passport_date_issue: data.passport_date_issue ? moment(data.passport_date_issue).format('Y-MM-DD') : null,
        };
        dispatch(savePolicy(objectToSend));
    };
    return (
        <div className="pre-form create-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8 small-gutters">
                        <div className="card custom-card">
                            <h4>Страховая сумма</h4>
                            <InputRange
                                withInput={true}
                                step='10000'
                                suffix={'₽'}
                                needToFormat={true}
                                defaultValue={getValues('sum')}
                                min={500000}
                                max={3000000}
                                onChangeValue={(value) => {
                                    setValue('sum', value);
                                }}
                            />
                            {/* <InputRange withInput={true} step={'500000'} suffix={''} needToFormat={true} defaultValue={2000000} min={500000} max={3000000} {...register('sum')} /> */}
                        </div>
                        <div className="card custom-card">
                            <h4>Период страхования</h4>
                            <InputRangeAges step={'1'} suffix={'год'} needToFormat={true} defaultValue={4} min={1} max={7} {...register('years')} />
                        </div>
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="row mb-0">
                                    <div className="col-12">
                                        <h5>Адрес</h5>
                                    </div>
                                </div>
                                {/* <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Регион' {...register('region', {
                                        required: requiredPattern
                                    })} />
                                    {errors.region && <span className="error-message">{errors.region.message}</span>}
                                </div> */}
                                <div className="form-group">
                                    <Controller
                                        name="region"
                                        control={control}
                                        rules={{ required: requiredPattern }}
                                        render={({ field }) => {
                                            return (
                                                <SearchableSelect
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                    {errors.region && <span className="error-message">{errors.region.message}</span>}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Город' {...register('city', {
                                                required: requiredPattern
                                            })} />
                                            {errors.city && <span className="error-message">{errors.city.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Улица' {...register('street', {
                                                required: requiredPattern
                                            })} />
                                            {errors.street && <span className="error-message">{errors.street.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Дом' {...register('house', {
                                                required: requiredPattern
                                            })} />
                                            {errors.house && <span className="error-message">{errors.house.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Квартира' {...register('flat', {
                                                required: requiredPattern
                                            })} />
                                            {errors.flat && <span className="error-message">{errors.flat.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Индекс' {...register('index', {
                                                required: requiredPattern
                                            })} />
                                            {errors.index && <span className="error-message">{errors.index.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Фамилия' {...register('surname', {
                                        required: requiredPattern
                                    })} />
                                    {errors.surname && <span className="error-message">{errors.surname.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Имя' {...register('first_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.first_name && <span className="error-message">{errors.first_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input className='form-control' type="text" placeholder='Отчество' {...register('second_name', {
                                        required: requiredPattern
                                    })} />
                                    {errors.second_name && <span className="error-message">{errors.second_name.message}</span>}
                                </div>
                                <div className="form-group">
                                    <input placeholder='E-mail' className='form-control' type="email" {...register('email', {
                                        required: requiredPattern,
                                        pattern: emailPattern
                                    })} />
                                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                                </div>
                                <div className="form-group">
                                    <h5>Пол</h5>
                                    <Controller
                                        name="male"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <ParentSelect
                                                    options={maleOptions}
                                                    {...field}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <h5>Дата рождения</h5>
                                            <Controller
                                                name="birthday"
                                                control={control}
                                                rules={{ required: requiredPattern }}
                                                render={({ field }) => {
                                                    return (
                                                        <DateSelect
                                                            {...field}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        {errors.birthday && <span className="error-message">{errors.birthday.message}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h5>Номер телефона</h5>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field: { onChange, name, value } }) => (
                                            <NumberFormat
                                                name={'phone'}
                                                value={value}
                                                onChange={onChange} className={'form-control'} format="+7(###)###-##-##" allowEmptyFormatting mask="_" />
                                        )}
                                    />
                                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h5>Паспортные данные</h5>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Серия' {...register('passport_series', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_series && <span className="error-message">{errors.passport_series.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-8">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Номер' {...register('passport_number', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_number && <span className="error-message">{errors.passport_number.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Кем выдан' {...register('passport_whom', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_whom && <span className="error-message">{errors.passport_whom.message}</span>}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Подразделение' {...register('passport_subvision_code', {
                                                required: requiredPattern
                                            })} />
                                            {errors.passport_subvision_code && <span className="error-message">{errors.passport_subvision_code.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <h5>Дата выдачи паспорта</h5>
                                            <Controller
                                                name="passport_date_issue"
                                                control={control}
                                                rules={{ required: requiredPattern }}
                                                render={({ field }) => {
                                                    return (
                                                        <DateSelect
                                                            {...field}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        {errors.passport_date_issue && <span className="error-message">{errors.passport_date_issue.message}</span>}
                                        <div className="form-group">
                                            <input className='form-control' type="text" placeholder='Номер кредитного договора' {...register('credit_number', {
                                                required: requiredPattern
                                            })} />
                                            {errors.credit_number && <span className="error-message">{errors.credit_number.message}</span>}
                                        </div>
                                        <div className="form-group">
                                            <h5>Дата выдачи кредита</h5>
                                            <Controller
                                                name="credit_date"
                                                control={control}
                                                rules={{ required: requiredPattern }}
                                                render={({ field }) => {
                                                    return (
                                                        <DateSelect
                                                            {...field}
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                        {errors.credit_date && <span className="error-message">{errors.credit_date.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <InfoCardCreate data={savedFields} loading={police.loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateForm;