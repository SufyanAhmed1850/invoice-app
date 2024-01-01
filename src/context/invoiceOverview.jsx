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
    const [showAddCompanyDetails, setShowAddCompanyDetails] = useState(false);

    const getInvoicesOverview = (page) => {
        axiosPrivate
            .get("/invoice/overview", { params: { page } })
            .then((response) => {
                setIsCompanyDetails(response?.data?.company);
                setInvoicesOverview(response?.data?.invoices);
                setTotalInvoices(response?.data?.totalInvoices);
                setPages(response?.data?.pages);
                setIsLoading(false);
                if (response?.data?.company) {
                    setShowAddCompanyDetails(false);
                } else {
                    setShowAddCompanyDetails(true);
                }
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    };

    useEffect(() => {
        location.pathname === "/" && getInvoicesOverview(currentPage || 1);
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
                showAddCompanyDetails,
            }}
        >
            {children}
        </invoicesOverviewContext.Provider>
    );
};

export default invoicesOverviewContext;
