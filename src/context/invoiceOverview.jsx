import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useLocation } from "react-router-dom";

const invoicesOverviewContext = createContext();

export const InvoicesOverviewProvider = ({ children }) => {
    const [invoicesOverview, setInvoicesOverview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const getInvoicesOverview = () => {
        axiosPrivate
            .get("/invoice/overview")
            .then((response) => {
                setInvoicesOverview(response?.data?.invoices);
                setIsLoading(false);
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    };

    useEffect(() => {
        (location.pathname === "/" ||
            location.pathname.startsWith("/invoice/")) &&
            (invoicesOverview || getInvoicesOverview());
    }, [location, invoicesOverview]);

    return (
        <invoicesOverviewContext.Provider
            value={{ invoicesOverview, isLoading, setInvoicesOverview }}
        >
            {children}
        </invoicesOverviewContext.Provider>
    );
};

export default invoicesOverviewContext;
