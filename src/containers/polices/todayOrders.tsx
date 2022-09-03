import { FC, useState, useEffect } from 'react';
import Accordion from '../../components/Accordion';
import OrderCard from '../../components/OrderCard';
import OrdersPagination from "../../components/OrdersPagination";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PolicyFilterProps } from "../../types/polices";
import { getOrders } from "../../redux/actions/orderActions";
import { resetStatus } from '../../redux/slices/orderSlice';
const TodayOrders: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders);
    const [filterProps, setFilterProps] = useState<PolicyFilterProps>({
        paginated: true,
        page: 1,
        today: true
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success]);

    useEffect(() => {
        if (orders.changeStatus.success) {
            dispatch(resetStatus());
        }
    }, [orders.changeStatus]);

    const onFilterChange = (prop: string, value: any) => {
        setFilterProps({
            ...filterProps,
            [prop]: value
        })
    };
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
    ];

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
                    <Accordion loading={orders.loading} list={orders.data && orders.data.data ? orders.data.data : []} />
                    {orders.data && orders.data.total > 20 && (
                        <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TodayOrders;