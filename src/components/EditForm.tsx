import { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import InfoCardCreate from './InfoCardCreate';
import NumberFormat from 'react-number-format';
import { emailPattern, requiredPattern } from '../functions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createFormData } from '../types/polices';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePolicy } from '../redux/actions/policeActions';
import { resetUpdatePolicy } from '../redux/slices/policeSlice';
import InputRange from './InputRange';
import DateSelect from './DateSelect';
import ParentSelect from './ParentSelect';
import moment from 'moment';
import { parse } from 'date-fns';
import SearchableSelect from './SearchableSelect';
import InputRangeAges from './InputRangeAges';

const maleOptions = [
    { value: '1', label: 'Мужской' },
    { value: '2', label: 'Женский' }
];

const EditForm = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const police = useAppSelector(state => state.police.savedPolicy);
    const updatedSuccess = useAppSelector(state => state.police.updatedPolicy);
    const currentGender = maleOptions.filter(item => item.value === police.data?.order.form.male);


    const { control, setValue, getValues, watch, register, handleSubmit, formState: { errors } } = useForm<createFormData>({
        defaultValues: {
            region: police.data && police.data.order.form.region,
            years: police.data && police.data.order.form.years ? Number(police.data.order.form.years) : 4,
            city: police.data && police.data.order.form.city,
            street: police.data && police.data.order.form.street,
            house: police.data && police.data.order.form.house,
            flat: police.data && police.data.order.form.flat,
            index: police.data && police.data.order.form.index,
            surname: police.data && police.data.order.form.surname,
            first_name: police.data && police.data.order.form.first_name,
            second_name: police.data && police.data.order.form.second_name,
            birthday: police.data && police.data.order.form.birthday ? parse(police.data?.order.form.birthday, "yyyy-MM-dd", new Date()) : undefined,
            passport_series: police.data && police.data.order.form.passport_series,
            passport_number: police.data && police.data.order.form.passport_number,
            passport_whom: police.data && police.data.order.form.passport_whom,
            passport_subvision_code: police.data && police.data.order.form.passport_subvision_code,
            passport_date_issue: police.data && police.data.order.form.passport_date_issue ? parse(police.data?.order.form.passport_date_issue, "yyyy-MM-dd", new Date()) : undefined,
            credit_number: police.data && police.data.order.form.credit_number,
            credit_date: police.data && police.data.order.form.credit_date ? parse(police.data?.order.form.passport_date_issue, "yyyy-MM-dd", new Date()) : undefined,
            male: police.data && police.data.order.form.male ? currentGender[0] : null,
            sum: police.data && police.data.order.limit_amount,
            email: police.data && police.data.order.email,
            phone: police.data && police.data.order.phone,
        }
    });

    const savedFields = watch(['sum', 'surname', 'first_name', 'second_name', 'years']);
    useEffect(() => {
        if (updatedSuccess.success) {
            dispatch(resetUpdatePolicy());
            navigate('/admin/new/complete?fromEdit=true');
        }
    }, [updatedSuccess.success]);
    const onSubmit = (data: createFormData) => {
        const tariff = police.data && police.data.order.form.tariff;
        const objectToSend = {
            ...data,
            id: params.id,
            tariff: tariff ? tariff : 1,
            male: data.male.value,
            birthday: data.birthday ? moment(data.birthday).format('Y-MM-DD') : null,
            credit_date: data.credit_date ? moment(data.credit_date).format('DD.MM.Y') : null,
            passport_date_issue: data.passport_date_issue ? moment(data.passport_date_issue).format('Y-MM-DD') : null,
        };

        dispatch(updatePolicy(objectToSend));
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
                            <InputRangeAges step={'1'} suffix={'год'} needToFormat={true} defaultValue={getValues('years')} min={1} max={7} {...register('years')} />
                        </div>
                        <div className="card custom-card">
                            <div className="card-body">
                                <div className="row mb-0">
                                    <div className="col-12">
                                        <h5>Адрес</h5>
                                    </div>
                                </div>
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
                        <InfoCardCreate data={savedFields} loading={updatedSuccess.loading} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditForm;