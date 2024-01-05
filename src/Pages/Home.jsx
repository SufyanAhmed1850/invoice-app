import "./css/home.css";
import { useState, useContext, useEffect } from "react";
import { Pagination } from "@mui/material";
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
        getInvoicesOverview,
        currentPage,
        setCurrentPage,
        totalInvoices,
        pages,
        showAddCompanyDetails,
        filterOptions,
        setFilterOptions,
    } = useContext(invoicesOverviewContext);
    const [showInvoicePanel, setShowInvoicePanel] = useState(false);
    const toggleInvoicePanel = () => {
        setShowInvoicePanel(!showInvoicePanel);
    };

    const invoiceNumberQuery = searchParams.get("invoiceNumber");
    useEffect(() => {
        if (invoiceNumberQuery) {
            console.log(invoiceNumberQuery);
            searchInvoice(invoiceNumberQuery);
        }
    }, []);

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
                console.log("Form values:", values);
                searchInvoice();
            },
        },
    );
    const searchInvoice = (invoiceNumberQuery) => {
        axiosPrivate
            .get(
                `/search?invoiceNumber=${
                    invoiceNumberQuery || values.invoiceNumber
                }`,
            )
            .then((response) => {
                console.log("Invoice Number", response);
                if (!invoiceNumberQuery) {
                    setSearchParams(values);
                }
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
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
                            <DropDown />
                        </div>
                        <div
                            onClick={() => {
                                // Check if all checked values are already true
                                if (
                                    !filterOptions.every(
                                        (option) => option.checked,
                                    )
                                ) {
                                    // If not all true, update the state
                                    setFilterOptions(
                                        filterOptions.map((option) => ({
                                            ...option,
                                            checked: true,
                                        })),
                                    );
                                }
                            }}
                            className="search-invoice-right"
                        >
                            <motion.h3 whileHover={{ letterSpacing: "1px" }}>
                                Reset
                            </motion.h3>
                            <img src={IconClear} alt="clear" />
                        </div>
                    </div>
                </div>

                {invoicesOverview?.length > 0 ? (
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
                                                    duration: 0.2,
                                                    delay: index * 0.05,
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
