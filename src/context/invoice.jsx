import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const invoiceDetailsContext = createContext();

export const InvoiceDetailsProvider = ({ children }) => {
    const [invoiceNum, setInvoiceNum] = useState(null);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [isDetailLoading, setIsDetailLoading] = useState(true);
    useEffect(() => {
        const getInvoiceDetails = () => {
            setIsDetailLoading(true);
            axiosPrivate
                .get(`/invoice/detail/${invoiceNum}`)
                .then((response) => {
                    console.log(response.data);
                    setInvoiceDetails((prev) => {
                        return {
                            ...prev,
                            [invoiceNum]: response?.data?.invoice,
                        };
                    });
                    setIsDetailLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                })
                .finally(() => setIsDetailLoading(false));
        };
        invoiceNum && !invoiceDetails?.[invoiceNum] && getInvoiceDetails();
    }, [invoiceNum]);
    return (
        <invoiceDetailsContext.Provider
            value={{
                invoiceDetails,
                isDetailLoading,
                setInvoiceDetails,
                setInvoiceNum,
            }}
        >
            {children}
        </invoiceDetailsContext.Provider>
    );
};

export default invoiceDetailsContext;
