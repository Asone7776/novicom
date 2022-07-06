import { FC, useEffect, useState } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { selectOption } from "../types/users";
import { Link } from 'react-router-dom';
interface InfoCardCreateProps {
    holder: selectOption
    loading: boolean
    data?: any
}

const InfoCardCreate: FC<InfoCardCreateProps> = ({ holder, loading, data }) => {
    const [risk, setRisk] = useState('Смерть');
    useEffect(() => {
        if (data) {
            formatRisk(data['case-0'], data['case-1']);
        }
    }, [data]);
    const formatRisk = (death: boolean, invalid: boolean) => {
        if (death && !invalid) {
            setRisk('Смерть')
        }
        if (invalid && !death) {
            setRisk('Инвалидность')
        }
        if (death && invalid) {
            setRisk('Смерть,Инвалидность');
        }
        if (!death && !invalid) {
            setRisk('Не указан');
        }
    }
    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{holder ? holder.label : '-'}</h4>
                </div>
                <div className="info-block">
                    <span>Лимит</span>
                    <h4>{data && data.limit ? formatPrice(data.limit) : '500 000'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховой риск</span>
                    <h4>{risk}</h4>
                </div>
                <div className="info-block">
                    <span>Срок страхования</span>
                    <h4>{data && data.term ? `${data.term} месяца` : '24 месяца'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <div className="pre-price">22 600 ₽</div>
                </div>
                <div>
                    <button type="submit" disabled={loading} className={cn('btn btn-primary', { 'loading': loading })}>
                        {loading ? (
                            <Spinner />
                        ) : 'Сформировать счёт'}
                    </button>
                    <Link to={'/admin/new'}>
                        <button className="btn btn-primary-tinned ml-0">
                            Отменить
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InfoCardCreate;