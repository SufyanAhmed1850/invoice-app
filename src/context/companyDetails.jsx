import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const companyDetailsContext = createContext();

export const CompanyDetailsProvider = ({ children }) => {
    const location = useLocation();
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getCompanyDetails = () => {
            axiosPrivate
                .get("/company-details")
                .then((response) => {
                    console.log("Company Details", response);
                    setCompanyDetails(
                        response?.data?.companyDetails?.companyDetails,
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                });
        };
        location.pathname == "/profile-details" &&
            (companyDetails || getCompanyDetails());
    }, [location]);
    return (
        <companyDetailsContext.Provider
            value={{
                companyDetails,
                setCompanyDetails,
                isLoading,
            }}
        >
            {children}
        </companyDetailsContext.Provider>
    );
};

export default companyDetailsContext;
