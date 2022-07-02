import { FC } from "react";
import CreateForm from "../../components/CreateForm";
const CreatePolicy: FC = () => {
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Страхование от несчастных случаев и потери дохода</h3>
                        <p>
                            Расчёт стоимости
                        </p>
                    </div>
                    <CreateForm />
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;