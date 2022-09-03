import React, { FC } from "react";
import AccordionItem from "./AccordionItem";
import Spinner from './Spinner';
import { changeStatus } from "../redux/actions/orderActions";
import { useAppDispatch } from "../redux/store";
import { OrderItem } from "../types/orders";

interface AccordionProps {
    loading: boolean
    list: OrderItem[] | []
}
const Accordion: FC<AccordionProps> = ({ loading, list }) => {
    const dispatch = useAppDispatch();
    if (loading) {
        return (
            <div className="vertical-center" style={{ position: 'relative' }}>
                <Spinner />
            </div>
        )
    }
    return (
        <div className="accordion" id="accordion">
            {list && list.map((item, index) => (
                <AccordionItem key={`acc-${index}`} item={item} onStatusChange={(status) => {
                    dispatch(changeStatus({
                        order_id: item.id,
                        status
                    }))
                }} />
            ))}
        </div>
    );
}

export default Accordion;