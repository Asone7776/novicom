import { FC } from 'react';
import Accordion from '../../components/Accordion';
import OrderCard from '../../components/OrderCard';


const TodayOrders: FC = () => {
    const cards = [
        {
            title: "Страхование от потери дохода",
            text: "Потеря Застрахованным лицом дохода от заработной платы по бессрочному трудовому договору вследствие прекращения данного трудового договора (потери работы)",
            link: '/admin/new/create'
        },
        {
            title: "Страхование от несчастных случаев и потери дохода",
            text: 'Комбинированного страхования от несчастных случаев, болезней и потери дохода',
            link: '/admin/new/create'
        }
    ]
    const list = [
        {
            id: 1,
            user_id: 6,
            type: 2,
            amount: "41650",
            limit_amount: "4900000",
            term: 12,
            policy_id: "3918843",
            policy_number: "22210NZI1340000352",
            status: 3,
            url: null,
            policy_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/1656424486XvV2oWkKiU0XIFd2.pdf",
            invoice_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/1656424490ArdCfV1RJLEMkWzD.pdf",
            buy_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/165642449090ZWp2ogQ9fAws4u.pdf",
            address: "630030, Новосибирск, Рабочая, д. 1А, кв. -",
            insurer: "Черных Дарья Сергеевна",
            phone: "+79132094529",
            email: "DChernykh@VSK.RU",
            options: [
                {
                    case: "ACCIDENT_DEATH",
                    value: true
                },
                {
                    case: "ACCIDENT_DISABILITY",
                    value: true
                }
            ],
            is_legal: 0,
            passport: "5014 244520",
            credit_number: "0572589-ОЭ",
            credit_institution: "Банк Левобережный (ПАО) г.Новосибирск, Кирова, 48",
            created_at: "2022-06-28T13:54:43.000000Z",
            updated_at: "2022-06-29T09:38:17.000000Z",
        },
        {
            id: 2,
            user_id: 6,
            type: 2,
            amount: "41650",
            limit_amount: "4900000",
            term: 12,
            policy_id: "3918843",
            policy_number: "22210NZI1340000352",
            status: 3,
            url: null,
            policy_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/1656424486XvV2oWkKiU0XIFd2.pdf",
            invoice_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/1656424490ArdCfV1RJLEMkWzD.pdf",
            buy_url: "https:\/\/vsk-trust.ru\/uploads\/pdf\/3918843\/165642449090ZWp2ogQ9fAws4u.pdf",
            address: "630030, Новосибирск, Рабочая, д. 1А, кв. -",
            insurer: "Черных Дарья Сергеевна",
            phone: "+79132094529",
            email: "DChernykh@VSK.RU",
            options: [
                {
                    case: "ACCIDENT_DEATH",
                    value: true
                },
                {
                    case: "ACCIDENT_DISABILITY",
                    value: true
                }
            ],
            is_legal: 0,
            passport: "5014 244520",
            credit_number: "0572589-ОЭ",
            credit_institution: "Банк Левобережный (ПАО) г.Новосибирск, Кирова, 48",
            created_at: "2022-06-28T13:54:43.000000Z",
            updated_at: "2022-06-29T09:38:17.000000Z"
        },
    ]
    return (
        <div className='today-orders'>
            <div className="row h-100">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Оформить новый полис страхования</h3>
                    </div>
                </div>
                <div className="col-6">
                    <OrderCard item={cards[0]} />
                </div>
                <div className="col-6">
                    <OrderCard item={cards[1]} />
                </div>
            </div>
            <div className="row orders">
                <div className="col-12">
                    <h4>Оформлено сегодня</h4>
                    <Accordion list={list} loading={false} />
                </div>
            </div>
        </div>
    );
}

export default TodayOrders;