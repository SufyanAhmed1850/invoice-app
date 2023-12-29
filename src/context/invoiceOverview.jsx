import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const invoicesOverviewContext = createContext();

export const InvoicesOverviewProvider = ({ children }) => {
    const [invoicesOverview, setInvoicesOverview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getInvoicesOverview = () => {
            console.log("Calling getInvoicesOverview");
            axiosPrivate
                .get("/invoice/overview")
                .then((response) => {
                    console.log(response?.data?.invoices);
                    setInvoicesOverview(response?.data?.invoices);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                });
        };
        invoicesOverview || getInvoicesOverview();
    }, []);

    return (
        <invoicesOverviewContext.Provider
            value={{ invoicesOverview, isLoading, setInvoicesOverview }}
        >
            {children}
        </invoicesOverviewContext.Provider>
    );
};

export default invoicesOverviewContext;
