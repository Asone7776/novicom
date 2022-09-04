import { FC } from "react";
import CreateForm from "../../components/CreateForm";
import { useSearchParams } from "react-router-dom";
const CreatePolicy: FC = () => {
    const [searchParams] = useSearchParams();
    const tariff = searchParams.get('tariff');
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>
                            {tariff === null || tariff === '1' ?
                                'Страхование от потери дохода' :
                                'Страхование от несчастных случаев и потери дохода'
                            }
                        </h3>
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