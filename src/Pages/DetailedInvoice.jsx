import "./css/detailedinvoice.css";
import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import invoiceDetailsContext from "../context/invoice";
import invoicesOverviewContext from "../context/invoiceOverview";
import { AnimatePresence } from "framer-motion";
import InvoiceStatus from "../Components/InvoiceStatus";
import Dialog from "../Components/Dialog";
import Button from "../Components/Button";
import leftArrowIcon from "../assets/images/icon-arrow-left.svg";
import { useParams } from "react-router-dom";
import InvoicePanel from "../Components/InvoicePanel";
import { axiosPrivate } from "../api/axios";
import toast from "react-hot-toast";
import DetailedInvoiceSkeleton from "../Components/DetailedInvoiceSkeleton";

const DetailedInvoice = () => {
    const [isStatusLoading, setIsStatusLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const location = useLocation();
    const to = location?.state?.from?.redirect || "/";
    const { invoiceNumber } = useParams();
    const {
        invoiceDetails,
        setInvoiceNum,
        setInvoiceDetails,
        isDetailLoading,
    } = useContext(invoiceDetailsContext);
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showInvoicePanel, setShowInvoicePanel] = useState(false);
    const toggleInvoicePanel = () => {
        setShowInvoicePanel(!showInvoicePanel);
    };
    const {
        invoicesOverview,
        getInvoicesOverview,
        currentPage,
        setCurrentPage,
    } = useContext(invoicesOverviewContext);

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    useEffect(() => {
        setInvoiceNum(invoiceNumber);
    }, []);

    const goBack = () => {
        to == "/" && !invoicesOverview && getInvoicesOverview(currentPage || 1);
        navigate(to);
    };

    const deleteInvoice = () => {
        setIsDeleteLoading(true);
        const _id = invoiceDetails?.[invoiceNumber]?._id;
        console.log(_id);
        axiosPrivate
            .delete(`/invoice/delete/${_id}`)
            .then((response) => {
                toast.success("Invoice deleted successfully!");
                console.log(response);
                if (invoicesOverview?.length == 1) {
                    getInvoicesOverview(currentPage - 1);
                    setCurrentPage((prev) => prev - 1);
                } else {
                    getInvoicesOverview(currentPage || 1);
                }
                navigate("/");
                const updatedInvoiceDetails = { ...invoiceDetails };
                delete updatedInvoiceDetails[invoiceNumber];
                setTimeout(() => {
                    setInvoiceDetails(updatedInvoiceDetails);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || error.message);
                return Promise.reject(error);
            })
            .finally(() => setIsDeleteLoading(false));
    };

    const markAsPaid = () => {
        setIsStatusLoading(true);
        const _id = invoiceDetails?.[invoiceNumber]?._id;
        axiosPrivate
            .patch("/invoice/status", { _id })
            .then((response) => {
                toast.success("Marked as paid successfully!");
                console.log(response);
                setInvoiceDetails({
                    ...invoiceDetails,
                    [invoiceNumber]: {
                        ...invoiceDetails[invoiceNumber],
                        status: "Paid",
                    },
                });
                getInvoicesOverview(currentPage);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || error.message);
                return Promise.reject(error);
            })
            .finally(() => setIsStatusLoading(false));
    };
    console.log(invoiceDetails);

    return (
        <>
            <InvoicePanel
                isOpen={showInvoicePanel}
                onClose={toggleInvoicePanel}
                edit="true"
                invoiceNumber={invoiceNumber}
            />
            <AnimatePresence>
                {showDialog && (
                    <Dialog
                        loading={isDeleteLoading}
                        setShowDialog={setShowDialog}
                        onClose={handleDialogClose}
                        onClick={deleteInvoice}
                    />
                )}
            </AnimatePresence>
            <div className="invoice-details-parent">
                <Button
                    text="Go back"
                    color="var(--8)"
                    bgColor="transparent"
                    img={leftArrowIcon}
                    onClick={goBack}
                />
                {isDetailLoading ? (
                    <DetailedInvoiceSkeleton />
                ) : invoiceDetails && invoiceDetails?.[invoiceNumber] ? (
                    <>
                        <div className="invoice-details-crud">
                            <div className="invoice-details-status">
                                <span>Status</span>
                                <InvoiceStatus
                                    status={
                                        invoiceDetails?.[invoiceNumber]?.status
                                    }
                                />
                            </div>
                            <div className="invoice-details-edit">
                                <Button
                                    onClick={toggleInvoicePanel}
                                    text="Edit"
                                    bgColor="var(--13)"
                                    color="var(--7)"
                                />
                                <Button
                                    text="Delete"
                                    bgColor="var(--9)"
                                    color="var(--0)"
                                    onClick={() => setShowDialog(true)}
                                />
                                <Button
                                    loading={isStatusLoading}
                                    disabled={
                                        invoiceDetails?.[invoiceNumber]
                                            ?.status == "Pending"
                                            ? false
                                            : true
                                    }
                                    onClick={markAsPaid}
                                    text="Mark as Paid"
                                    bgColor="var(--1)"
                                    color="var(--0)"
                                />
                            </div>
                        </div>
                        <div className="invoice-details">
                            <div className="invoice-details-header">
                                <div className="invoice-details-meta">
                                    <h3>
                                        <span>#</span>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.invoiceNumber
                                        }
                                    </h3>
                                    <span>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.projectDescription
                                        }
                                    </span>
                                </div>
                                <div className="invoice-details-vendor-info">
                                    <p>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.sender?.companyDetails
                                                ?.address
                                        }
                                    </p>
                                    <p>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.sender?.companyDetails?.city
                                        }
                                    </p>
                                    <p>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.sender?.companyDetails
                                                ?.postCode
                                        }
                                    </p>
                                    <p>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.sender?.companyDetails
                                                ?.country
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="invoice-details-body">
                                <div className="invoice-details-dates">
                                    <div className="invoice-details-date">
                                        <span>Invoice Date</span>
                                        <h3>
                                            {dayjs(
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.invoiceDate,
                                            ).format("DD MMM YYYY")}
                                        </h3>
                                    </div>
                                    <div className="invoice-details-due-date">
                                        <span>Payment Due</span>
                                        <h3>
                                            {dayjs(
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.dueDate,
                                            ).format("DD MMM YYYY")}
                                        </h3>
                                    </div>
                                </div>
                                <div className="invoice-details-client-info">
                                    <div className="invoice-details-client-name">
                                        <span>Bill To</span>
                                        <h3>
                                            {
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.clientName
                                            }
                                        </h3>
                                    </div>
                                    <div className="invoice-details-client-address">
                                        <p>
                                            {
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.clientAddress
                                            }
                                        </p>
                                        <p>
                                            {
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.clientCity
                                            }
                                        </p>
                                        <p>
                                            {
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.clientPostCode
                                            }
                                        </p>
                                        <p>
                                            {
                                                invoiceDetails?.[invoiceNumber]
                                                    ?.clientCountry
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="invoice-details-client-email">
                                    <span>Sent to</span>
                                    <h3>
                                        {
                                            invoiceDetails?.[invoiceNumber]
                                                ?.clientEmail
                                        }
                                    </h3>
                                </div>
                            </div>
                            <div className="invoice-details-footer">
                                <div className="invoice-details-footer-pricing">
                                    <div className="invoice-details-footer-pricing-header">
                                        <p></p>
                                        <p>QTY.</p>
                                        <p>Price</p>
                                        <p>Total</p>
                                    </div>
                                    {invoiceDetails?.[invoiceNumber] &&
                                        invoiceDetails?.[
                                            invoiceNumber
                                        ]?.items.map((item, ind) => (
                                            <div
                                                key={ind}
                                                className="invoice-details-footer-pricing-item"
                                            >
                                                <h4>{item.itemName}</h4>
                                                <h4 className="qty">
                                                    {item.qty}
                                                </h4>
                                                <h4 className="price">
                                                    $ {item.price}
                                                </h4>
                                                <h4>$ {item.total}</h4>
                                            </div>
                                        ))}
                                </div>
                                <div className="invoice-details-footer-due">
                                    <p>Amount Due</p>
                                    <h2>
                                        ${" "}
                                        {invoiceDetails?.[invoiceNumber]?.total}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-invoices">
                        <img
                            src={
                                "https://res.cloudinary.com/dke5jqhus/image/upload/f_webp/v1703925122/illustration-empty_txzcvq.svg"
                            }
                            alt="No Invoices"
                        />
                        <h2>Couldn't find #{invoiceNumber}</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default DetailedInvoice;
