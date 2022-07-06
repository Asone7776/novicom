import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "../../components/Accordion";
import { useEffect } from "react";
import { getOrders } from "../../redux/actions/orderActions";
import OrderFilters from '../../components/OrderFilters';
import { getUsers } from "../../redux/actions/usersActions";
import OrdersPagination from "../../components/OrdersPagination";
import { resetStatus } from '../../redux/slices/orderSlice';
import { useAppDispatch, useAppSelector } from "../../redux/store";
const PolicyPage: FC = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders);
    const users = useAppSelector((state) => state.users);
    const navigate = useNavigate();
    const [filterProps, setFilterProps] = useState<any>({
        paginated: true,
        page: 1
    });
    useEffect(() => {
        dispatch(getOrders(filterProps));
    }, [filterProps, orders.changeStatus.success]);

    useEffect(() => {
        // dispatch(getUsers());
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

    const onDateRange = (arr: any) => {
        setFilterProps({
            ...filterProps,
            page: 1,
            from: arr[0] ? arr[0] : null,
            to: arr[1] ? arr[1] : null,
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
                        {/* <Accordion loading={orders.loading} list={orders.data.data} />
                        {orders.data.total > 20 && (
                            <OrdersPagination last_page={orders.data.last_page} onFilterChange={onFilterChange} initialPage={filterProps.page} />
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PolicyPage;