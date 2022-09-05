import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CompleteCard from "../../components/CompleteCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosAuth } from "../../axios-instances";
import { failureNotify, successNotify } from "../../notifications";
import { resetSavedPolicy } from "../../redux/slices/policeSlice";
import { base64ToArrayBuffer } from "../../functions";
import TabsWrapper from "../../components/TabsWrapper";
import { tabsTitles } from "../../constants";


const CompletePolice: FC = () => {
    const [searchParams] = useSearchParams();
    const fromEdit = searchParams.get('fromEdit');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const police = useAppSelector(state => fromEdit === 'true' ? state.police.updatedPolicy.data : state.police.savedPolicy.data);
    const [pdfs, setPdfs] = useState<ArrayBufferLike[] | null>(null);
    const [sendLoading, setSendLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const sendToInsurer = async () => {
        setSendLoading(true);
        try {
            const response = await axiosAuth.get(`/orders_send/${police?.order?.id}`);
            successNotify(response.data.data);
            setSendLoading(false);
            dispatch(resetSavedPolicy());
            navigate('/admin/new');
        } catch (error: any) {
            setSendLoading(false);
            dispatch(resetSavedPolicy());
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const cancelOrder = async () => {
        setCancelLoading(true);
        try {
            const response = await axiosAuth.delete(`/orders/${police?.order?.id}`);
            successNotify(response.data.data);
            setCancelLoading(false);
            dispatch(resetSavedPolicy());
            navigate('/admin/new');
        } catch (error: any) {
            setCancelLoading(false);
            dispatch(resetSavedPolicy());
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    const editOrder = async () => {
        navigate(`/admin/new/edit/${police?.order?.id}`);
    }
    const getPDFS = async () => {
        try {
            const response = await axiosAuth.get(`/order_pdfs/${police?.order?.id}`);
            const { buy, invoice } = response.data.data;
            const buyPdf = base64ToArrayBuffer(buy);
            const invoicePdf = base64ToArrayBuffer(invoice);
            setPdfs([buyPdf, invoicePdf]);
        } catch (error: any) {
            if (error.response.data && error.response.data.errors) {
                failureNotify(error.response.data.errors);
            }
        }
    }
    useEffect(() => {
        if (police?.order?.id) {
            getPDFS();
        }
    }, [police?.order?.id]);
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Полис страхования</h3>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <TabsWrapper titles={tabsTitles} pdfs={pdfs} />
                        </div>
                        <div className="col-4">
                            <CompleteCard data={police && police.order} cancelLoading={cancelLoading} sendLoading={sendLoading} onCancel={cancelOrder} onEdit={editOrder} onSend={sendToInsurer} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompletePolice;