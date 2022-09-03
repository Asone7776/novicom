import { FC } from "react";
import EditForm from "../../components/EditForm";
import { useAppSelector } from "../../redux/store";
const EditPolicy: FC = () => {
    const police = useAppSelector(state => state.police.savedPolicy.data);
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Редактировать полис - {police && police.order && police.order.policy_number}</h3>
                    </div>
                    <EditForm />
                </div>
            </div>
        </div>
    );
}

export default EditPolicy;