import { FC, useState } from "react";
import cn from "classnames";
import { formatPrice, formatDate, getStatusName, declOfNum } from "../functions";
import { textForms } from '../constants';
interface AccordionItemProps {
    item: any
    onStatusChange: (status: number) => void
}
const AccordionItem: FC<AccordionItemProps> = ({ item, onStatusChange }) => {
    const [active, setActive] = useState(false);
    const onToggle = () => {
        setActive(!active);
    }
    return (
        <div className="card">
            <div className="card-header" id={`heading-${item.id}`}>
                <div className="collapsed" data-toggle="collapse" data-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`} onClick={onToggle}>
                    <div className="row">
                        <div className="col col-7 id">
                            {item.policy_number}
                        </div>
                        <div className="col date text-center ml-auto">
                            {item.created_at ? formatDate(item.created_at) : null}
                        </div>
                        <div className="col price text-center">
                            {item.amount ? `${formatPrice(item.amount)}₽` : null}
                        </div>
                        <div className="col status text-center">
                            <span className={cn({ 'completed': item.status === 3, 'not-completed': item.status === -1 })}>{getStatusName(item.status)}</span>
                        </div>
                        <div className="text-right">
                            <div className='arrow'>
                                <svg className={cn({ 'active': active })} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.25752 8.9225L9.91252 13.5775C10.2384 13.9033 10.7659 13.9033 11.0909 13.5775L15.7459 8.9225C16.2709 8.3975 15.8992 7.5 15.1567 7.5H5.84669C5.10419 7.5 4.73252 8.3975 5.25752 8.9225Z" fill="#E1BA00" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id={`collapse-${item.id}`} className="collapse" aria-labelledby={`heading-${item.id}`}>
                <div className="card-body">
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Тип страхования</div>
                                {item.form && item.form.tariff === null || item.form.tariff === '1' ?
                                    'Страхование от потери дохода' :
                                    'Страхование от несчастных случаев и потери дохода'
                                }
                            </div>
                        </div>
                        <div className="col-2 ml-auto">
                            <div className="item">
                                <div className="sub-heading">Стоимость</div>
                                {item.amount ? `${formatPrice(item.amount)}₽` : null}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="item">
                                <div className="sub-heading">Сумма страхования</div>
                                {item.limit_amount ? `${formatPrice(item.limit_amount)}₽` : null}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="item">
                                <div className="sub-heading">Срок страхования</div>
                                {item.form && item.form.years ? `${item.form.years} ${declOfNum(item.form.years, textForms)}` : null}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">Страхователь</div>
                                <div className="heading">{item.insurer ? item.insurer : null}</div>
                            </div>
                        </div>
                        <div className="col-2 ml-auto">
                            <div className="item">
                                <div className="sub-heading">Паспорт</div>
                                <div className="heading">{item.form && item.form.passport_number ? item.form.passport_number : null}</div>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="item">
                                <div className="sub-heading">Номер телефона</div>
                                <div className="heading">{item.phone ? item.phone : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading">E-mail</div>
                                <div className="heading">{item.email ? item.email : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading">Кредитный договор</div>
                                <div className="heading">{item.form && item.form.credit_number ? `№${item.form.credit_number}` : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Адрес</div>
                                <div className="heading">{item.address ? item.address : null}</div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="item">
                                <div className="sub-heading">Корпус</div>
                                <div className="heading">{item.form && item.form.building ? item.form.building : null}</div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col-5">
                            <div className="item">
                                <div className="sub-heading big">Полис</div>
                                {item.policy_url && (
                                    <a href={item.policy_url}>{item.policy_url}</a>
                                )}
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="item">
                                <div className="sub-heading big">Счёт на оплату</div>
                                {item.invoice_url && (
                                    <a href={item.invoice_url}>{item.invoice_url}</a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="item">
                                <div className="sub-heading big">Статус оплаты</div>
                                <div className="d-flex">
                                    <div className={cn('btn', { 'btn-primary': item.status === 3, 'btn-gray-transparent': item.status !== 3 })} onClick={() => {
                                        onStatusChange(3);
                                    }}>
                                        Оплачен
                                    </div>
                                    <div className={cn('btn', { 'btn-primary': item.status === 0, 'btn-gray-transparent': item.status !== 0 })} onClick={() => {
                                        onStatusChange(0);
                                    }}>
                                        Не оплачен
                                    </div>
                                    <div className={cn('btn', { 'btn-primary': item.status === -1, 'btn-gray-transparent': item.status !== -1 })} onClick={() => {
                                        onStatusChange(-1);
                                    }}>
                                        Отменён
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccordionItem;