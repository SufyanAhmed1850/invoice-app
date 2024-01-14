import "./css/home.css";
import { useState, useContext, useEffect } from "react";
import { Pagination, Skeleton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import invoicesOverviewContext from "../context/invoiceOverview";
import Invoice from "../Components/Invoice";
import InvoicePanel from "../Components/InvoicePanel";
import Button from "../Components/Button";
import addInvoiceIcon from "../assets/images/icon-add-invoice.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import DropDown from "../Components/DropDown";
import IconInput from "../Components/IconInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { axiosPrivate } from "../api/axios";
import IconClear from "../assets/images/icon-clear.svg";

const Home = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        invoicesOverview,
        setInvoicesOverview,
        isCompanyDetails,
        setIsCompanyDetails,
        getInvoicesOverview,
        currentPage,
        setCurrentPage,
        totalInvoices,
        pages,
        showAddCompanyDetails,
        filterOptions,
        setFilterOptions,
        isLoading,
        isFisrstLoading,
    } = useContext(invoicesOverviewContext);
    const [showInvoicePanel, setShowInvoicePanel] = useState(false);
    const toggleInvoicePanel = () => {
        setShowInvoicePanel(!showInvoicePanel);
    };

    const invoiceNumberQuery = searchParams.get("invoiceNumber");
    useEffect(() => {
        if (invoiceNumberQuery) {
            searchInvoice(invoiceNumberQuery);
            axiosPrivate
                .get(`/search?invoiceNumber=${invoiceNumberQuery}`)
                .then((response) => {
                    setIsCompanyDetails(response?.data?.company);
                    setInvoicesOverview([response?.data?.invoice]);
                })
                .catch((error) => {
                    console.error(error);
                    return Promise.reject(error);
                });
        }
    }, [invoiceNumberQuery]);

    const validationSchema = yup.object().shape({
        invoiceNumber: yup.string().required("Required"),
    });
    const { values, errors, handleChange, handleSubmit, resetForm } = useFormik(
        {
            initialValues: {
                invoiceNumber: "",
            },
            validationSchema: validationSchema,
            onSubmit: (values, actions) => {
                searchInvoice();
            },
        },
    );
    const searchInvoice = (invoiceNumberQuery) => {
        const searchValue = invoiceNumberQuery || values.invoiceNumber;
        setSearchParams({ invoiceNumber: searchValue });
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <>
            <InvoicePanel
                isOpen={showInvoicePanel}
                onClose={toggleInvoicePanel}
                edit="false"
            />
            <div className="invoices-parent">
                <div className="invoice-head-parent">
                    <div className="invoices-head">
                        <div className="invoices-title">
                            <h1>Invoices</h1>
                            <p>
                                {totalInvoices > 0
                                    ? `There are ${totalInvoices} total invoices`
                                    : "No invoices"}
                            </p>
                        </div>
                        <div className="new-invoice-btn-container">
                            <Button
                                disabled={!isCompanyDetails && true}
                                text="New Invoice"
                                onClick={toggleInvoicePanel}
                                img={addInvoiceIcon}
                            />
                            {showAddCompanyDetails && (
                                <p onClick={() => navigate("/profile-details")}>
                                    Add <span>Company Details</span>
                                </p>
                            )}
                        </div>
                    </div>
                    {isFisrstLoading ? (
                        <div
                            className="search-invoice"
                            style={{ marginBottom: 16 }}
                        >
                            <div className="search-invoice-left">
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={120}
                                    height={14}
                                />
                                <Skeleton
                                    animation="wave"
                                    variant="rounded"
                                    width={120}
                                    height={14}
                                />
                            </div>
                            <Skeleton
                                animation="wave"
                                variant="rounded"
                                width={75}
                                height={14}
                            />
                        </div>
                    ) : searchParams.size != 0 ||
                      (totalInvoices && totalInvoices > 0) ? (
                        <div className="search-invoice">
                            <div className="search-invoice-left">
                                <IconInput
                                    value={values.invoiceNumber}
                                    onChange={handleChange}
                                    id="invoiceNumber"
                                    onClick={handleSubmit}
                                    onKeyDown={handleEnterKeyPress}
                                    error={errors.invoiceNumber}
                                />

                                {!invoiceNumberQuery && <DropDown />}
                            </div>
                            <motion.div
                                whileHover={{ letterSpacing: "1px" }}
                                onClick={() => {
                                    if (
                                        !filterOptions.every(
                                            (option) => option.checked,
                                        )
                                    ) {
                                        setFilterOptions(
                                            filterOptions.map((option) => ({
                                                ...option,
                                                checked: true,
                                            })),
                                        );
                                    }
                                    setSearchParams("");
                                    resetForm();
                                }}
                                className="search-invoice-right"
                            >
                                Reset
                                <img src={IconClear} alt="clear" />
                            </motion.div>
                        </div>
                    ) : null}
                </div>

                {isLoading ? (
                    <div className="invoices-main">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <div key={num}>
                                <Invoice />
                            </div>
                        ))}
                    </div>
                ) : invoicesOverview?.length > 0 ? (
                    <>
                        <div className="invoices-main">
                            <AnimatePresence mode="popLayout">
                                {invoicesOverview &&
                                    invoicesOverview.map(
                                        (invoiceOverview, index) => (
                                            <motion.div
                                                key={
                                                    invoiceOverview.invoiceNumber
                                                }
                                                initial={{ opacity: 0, y: -25 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 25 }}
                                                transition={{
                                                    duration: 0.25,
                                                    delay: index * 0.05,
                                                    ease: [0.83, 0, 0.17, 1],
                                                }}
                                            >
                                                <Invoice
                                                    key={
                                                        invoiceOverview.invoiceNumber
                                                    }
                                                    invoiceNumber={
                                                        invoiceOverview.invoiceNumber
                                                    }
                                                    name={
                                                        invoiceOverview.clientName
                                                    }
                                                    total={
                                                        invoiceOverview.total
                                                    }
                                                    dueDate={
                                                        invoiceOverview.dueDate
                                                    }
                                                    status={
                                                        invoiceOverview.status
                                                    }
                                                />
                                            </motion.div>
                                        ),
                                    )}
                            </AnimatePresence>
                        </div>
                        {!invoiceNumberQuery && (
                            <Pagination
                                page={currentPage}
                                sx={{ paddingBottom: "32px" }}
                                count={pages}
                                onChange={(event, page) => {
                                    if (currentPage !== page) {
                                        setCurrentPage(page);
                                        getInvoicesOverview(page);
                                    }
                                }}
                            />
                        )}
                    </>
                ) : (
                    <div className="empty-invoices">
                        <img
                            src={
                                "https://res.cloudinary.com/dke5jqhus/image/upload/f_webp/v1703925122/illustration-empty_txzcvq.svg"
                            }
                            alt="No Invoices"
                        />
                        <h2>There is nothing here</h2>
                        <span>
                            Create an invoice by clicking the{" "}
                            <span style={{ fontWeight: "700" }}>
                                New Invoice
                            </span>{" "}
                            button and get started
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
