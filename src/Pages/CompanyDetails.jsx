import "./css/companydetails.css";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { axiosPrivate } from "../api/axios";
import companyDetailsContext from "../context/companyDetails.jsx";
import invoicesOverviewContext from "../context/invoiceOverview.jsx";
import { companyDetailsSchema } from "../schemas/companyDetailsSchema.jsx";
import toast from "react-hot-toast";
import Input from "../Components/Input";
import Button from "../Components/Button.jsx";
import leftArrowIcon from "../assets/images/icon-arrow-left.svg";
import { Skeleton } from "@mui/material";

const CompanyDetails = () => {
    const location = useLocation();
    const to = location?.state?.from?.redirect || "/";
    const navigate = useNavigate();
    const { companyDetails, setCompanyDetails } = useContext(
        companyDetailsContext,
    );
    const {
        invoicesOverview,
        setIsCompanyDetails,
        getInvoicesOverview,
        currentPage,
    } = useContext(invoicesOverviewContext);
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
        useFormik({
            initialValues: {
                name: companyDetails?.name || "",
                address: companyDetails?.address || "",
                city: companyDetails?.city || "",
                postCode: companyDetails?.postCode || "",
                country: companyDetails?.country || "",
            },
            validationSchema: companyDetailsSchema,
            onSubmit: (values, actions) => {
                console.log("Form submitted with values:", values);
                saveCompantDetails(values, actions);
            },
            enableReinitialize: true,
        });
    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    const handleSaveClick = () => {
        console.log(errors);
        handleSubmit();
    };
    const saveCompantDetails = (values, actions) => {
        const companyDetails = values;
        console.log(companyDetails);
        const savePromise = axiosPrivate
            .post("/company-details", {
                companyDetails,
            })
            .then((response) => {
                setCompanyDetails(values);
                setIsCompanyDetails(true);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        toast.promise(
            savePromise,
            {
                loading: "Saving...",
                success: "Saved successfully!",
                error: (err) => err.response.data.message,
            },
            {
                style: {
                    background: "var(--8)",
                    color: "var(--0)",
                },
                loading: {
                    position: "bottom-center",
                },
                success: {
                    duration: 2000,
                    position: "bottom-center",
                },
                error: {
                    duration: 2000,
                    position: "bottom-center",
                },
            },
        );
    };

    const goBack = () => {
        console.log(to);
        to == "/" && !invoicesOverview && getInvoicesOverview(currentPage || 1);
        navigate(to);
    };
    return (
        <>
            <div className="company-details-parent">
                <Button
                    text="Go back"
                    color="var(--8)"
                    bgColor="transparent"
                    img={leftArrowIcon}
                    onClick={goBack}
                />
                <div className="company-details-main">
                    <div className="company-details-head">
                        <h1>Company Details</h1>
                        <h3>Add your company details</h3>
                    </div>
                    <div className="company-details-input-1">
                        <Input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="name"
                            type="text"
                            label="Name"
                            error={errors.name}
                            touched={touched.name}
                        />
                    </div>
                    <div className="company-details-input-2">
                        <Input
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="address"
                            type="text"
                            label="Street Address"
                            error={errors.address}
                            touched={touched.address}
                        />
                    </div>
                    <div className="company-details-input-3">
                        <Input
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="city"
                            type="text"
                            label="City"
                            error={errors.city}
                            touched={touched.city}
                        />
                        <Input
                            value={values.postCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="postCode"
                            type="text"
                            label="Post Code"
                            error={errors.postCode}
                            touched={touched.postCode}
                        />
                        <Input
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="country"
                            type="text"
                            label="Country"
                            error={errors.country}
                            touched={touched.country}
                        />
                    </div>
                </div>
                <div className="company-details-save">
                    <Button text="Save" onClick={handleSaveClick} />
                </div>
            </div>
        </>
    );
};

export default CompanyDetails;
