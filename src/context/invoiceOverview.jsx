import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useLocation } from "react-router-dom";

const invoicesOverviewContext = createContext();

export const InvoicesOverviewProvider = ({ children }) => {
    const location = useLocation();
    const [invoicesOverview, setInvoicesOverview] = useState(null);
    const [pages, setPages] = useState(false);
    const [totalInvoices, setTotalInvoices] = useState(false);
    const [isCompanyDetails, setIsCompanyDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const getInvoicesOverview = (page) => {
        console.log("Calling invoices overview api");
        axiosPrivate
            .get("/invoice/overview", { params: { page } })
            .then((response) => {
                setInvoicesOverview((prev) => ({
                    ...prev,
                    [page]: response?.data?.invoices,
                }));
                setIsCompanyDetails(response?.data?.company);
                setInvoicesOverview(response?.data?.invoices);
                setTotalInvoices(response?.data?.totalInvoices);
                setPages(response?.data?.pages);
                setIsLoading(false);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    };

    useEffect(() => {
        location.pathname === "/" && getInvoicesOverview(1);
    }, [location]);

    return (
        <invoicesOverviewContext.Provider
            value={{
                pages,
                invoicesOverview,
                setInvoicesOverview,
                getInvoicesOverview,
                isCompanyDetails,
                setIsCompanyDetails,
                currentPage,
                setCurrentPage,
                totalInvoices,
                isLoading,
            }}
        >
            {children}
        </invoicesOverviewContext.Provider>
    );
};

export default invoicesOverviewContext;
