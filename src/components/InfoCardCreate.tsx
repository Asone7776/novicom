import { FC } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
interface InfoCardCreateProps {
    loading: boolean
    data?: any
}

const InfoCardCreate: FC<InfoCardCreateProps> = ({ loading, data }) => {
    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                <div className="info-block">
                    <span>Страхователь</span>
                    {data && `${data[1] ? data[1] : ''} ${data[2] ? data[2] : ''} ${data[3] ? data[3] : ''}`}
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Лимит</span>
                    <h4>{data && data[0] ? formatPrice(data[0]) : '-'}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Страховой риск</span>
                    <h4>{data && data[4] && data[4].label}</h4>
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