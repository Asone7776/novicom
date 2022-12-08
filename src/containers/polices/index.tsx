import { FC, useState, useEffect } from "react";
import moment from "moment";
import Accordion from "../../components/Accordion";
import { getOrders } from "../../redux/actions/orderActions";
import OrderFilters from '../../components/OrderFilters';
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PolicyFilterProps } from "../../types/polices";
const PolicyPage: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders);
    const users = useAppSelector((state) => state.users);
    const [filterProps, setFilterProps] = useState<PolicyFilterProps>({
        paginated: true,
        page: 1
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success]);

    useEffect(() => {
        dispatch(getUsers());
    }, []);
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

    const onDateRange = (name: string, value: Date | null) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            [name]: value ? moment(value).format('DD.MM.YYYY') : null,
        })
    };

    const onTopFiltersChange = (prop: string, value: any) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            [prop]: value
        })
    };


    return (
        <>
            <div className="information list-wrapper">
                <div className="row">
                    <div className="col-12">
                        <div className="top-heading">
                            <h3>История</h3>
                        </div>
                        <OrderFilters users={users.data} onFilterChange={onTopFiltersChange} onDateRange={onDateRange} />
                        <Accordion loading={orders.loading} list={orders.data && orders.data.data ? orders.data.data : []} />
                        {orders.data && orders.data.total > 20 && (
                            <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;