import { createContext, useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useLocation, useSearchParams } from "react-router-dom";

const invoicesOverviewContext = createContext();

export const InvoicesOverviewProvider = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [invoicesOverview, setInvoicesOverview] = useState(null);
    const [pages, setPages] = useState(false);
    const [totalInvoices, setTotalInvoices] = useState(false);
    const [isCompanyDetails, setIsCompanyDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddCompanyDetails, setShowAddCompanyDetails] = useState(false);
    const [filterOptions, setFilterOptions] = useState([
        {
            text: "Draft",
            checked: searchParams.get("draft") ? false : true,
        },
        {
            text: "Pending",
            checked: searchParams.get("pending") ? false : true,
        },
        {
            text: "Paid",
            checked: searchParams.get("paid") ? false : true,
        },
    ]);

    const getInvoicesOverview = (page) => {
        axiosPrivate
            .post("/invoice/overview", { page, filterOptions })
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
                filterOptions,
                setFilterOptions,
            }}
        >
            {children}
        </invoicesOverviewContext.Provider>
    );
};

export default invoicesOverviewContext;
