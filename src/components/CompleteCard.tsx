import { FC } from "react";
import cn from "classnames";
import { formatPrice } from "../functions";
import Spinner from "./Spinner";
import { Link } from 'react-router-dom';
interface CompleteCardCreateProps {
    cancelLoading: boolean
    sendLoading: boolean
    data: any
    onCancel: () => void
    onSend: () => void
    onEdit: () => void
}

const CompleteCard: FC<CompleteCardCreateProps> = ({ cancelLoading, sendLoading, data, onCancel, onEdit, onSend }) => {

    return (
        <div className='card custom-card-small'>
            <div className={'info-wrapper'}>
                <div className="info-block">
                    <span>Страхователь</span>
                    <h4>{data && data.insurer ? data.insurer : ''}</h4>
                </div>
                <div className="divider"></div>
                <div className="info-block">
                    <span>Сумма страхования</span>
                    <h4>{data && data.limit_amount ? `${formatPrice(data.limit_amount)} ₽` : ''}</h4>
                </div>
                <div className="divider"></div>

                <div className="info-block">
                    <span className="mb-0">Стоимость полиса</span>
                    <div className="pre-price">{data && data.amount ? `${formatPrice(data.amount)} ₽` : ''}</div>
                </div>
                <div>
                    <button className={'btn btn-primary'} onClick={onEdit}>
                        Редактировать
                    </button>
                    <button disabled={sendLoading} className={cn('btn btn-blue ml-0', { 'loading': sendLoading })} onClick={onSend}>
                        {sendLoading ? (
                            <Spinner />
                        ) : 'Отправить страхователю'}
                    </button>
                    <button disabled={cancelLoading} className={cn('btn btn-danger ml-0', { 'loading': cancelLoading })} onClick={onCancel}>
                        {cancelLoading ? (
                            <Spinner />
                        ) : 'Отменить'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompleteCard;