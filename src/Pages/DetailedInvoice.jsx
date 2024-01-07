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
import { Skeleton } from "@mui/material";

const DetailedInvoice = () => {
    const location = useLocation();
    const to = location?.state?.from?.redirect || "/";
    const { invoiceNumber } = useParams();
    const { invoiceDetails, setInvoiceNum, setInvoiceDetails } = useContext(
        invoiceDetailsContext,
    );
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
        console.log(to);
        to == "/" && !invoicesOverview && getInvoicesOverview(currentPage || 1);
        navigate(to);
    };

    const deleteInvoice = () => {
        const _id = invoiceDetails?.[invoiceNumber]?._id;
        console.log(_id);
        axiosPrivate
            .delete(`/invoice/delete/${_id}`)
            .then((response) => {
                console.log(response);
                setCurrentPage(1);
                getInvoicesOverview(currentPage || 1);
                navigate("/");
                const updatedInvoiceDetails = { ...invoiceDetails };
                delete updatedInvoiceDetails[invoiceNumber];
                setTimeout(() => {
                    setInvoiceDetails(updatedInvoiceDetails);
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
    };

    const markAsPaid = () => {
        const _id = invoiceDetails?.[invoiceNumber]?._id;
        const updateStatusPromise = axiosPrivate
            .patch("/invoice/status", { _id })
            .then((response) => {
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
                return Promise.reject(error);
            });
        toast.promise(
            updateStatusPromise,
            {
                loading: "Updating status...",
                success: "Status updated successfully!",
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
                <div className="invoice-details-crud">
                    <div className="invoice-details-status">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            width={60}
                            height={18}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ borderRadius: "6px" }}
                            width={80}
                            height={36}
                        />
                        {/* <span>Status</span> */}
                        {/* <InvoiceStatus
                            status={invoiceDetails?.[invoiceNumber]?.status}
                        /> */}
                    </div>
                    <div className="invoice-details-edit">
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ borderRadius: 100 }}
                            width={72}
                            height={45}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ borderRadius: 100 }}
                            width={88}
                            height={45}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rounded"
                            sx={{ borderRadius: 100 }}
                            width={132}
                            height={45}
                        />
                        {/* <Button
                            onClick={toggleInvoicePanel}
                            text="Edit"
                            bgColor="#f9fafe"
                            color="var(--7)"
                        />
                        <Button
                            text="Delete"
                            bgColor="var(--9)"
                            color="var(--0)"
                            onClick={() => setShowDialog(true)}
                        />
                        <Button
                            disabled={
                                invoiceDetails?.[invoiceNumber]?.status ==
                                "Pending"
                                    ? false
                                    : true
                            }
                            onClick={markAsPaid}
                            text="Mark as Paid"
                            bgColor="var(--1)"
                            color="var(--0)"
                        /> */}
                    </div>
                </div>
                <div className="invoice-details">
                    <div className="invoice-details-header">
                        <div className="invoice-details-meta">
                            <Skeleton
                                variant="rounded"
                                width={62}
                                height={14}
                            />
                            <Skeleton
                                variant="rounded"
                                width={100}
                                height={10}
                            />
                            {/* <h3>
                                <span>#</span>
                                {invoiceDetails?.[invoiceNumber]?.invoiceNumber}
                            </h3>
                            <span>
                                {
                                    invoiceDetails?.[invoiceNumber]
                                        ?.projectDescription
                                }
                            </span> */}
                        </div>
                        <div className="invoice-details-vendor-info">
                            <Skeleton
                                variant="rounded"
                                width={120}
                                height={10}
                            />
                            <Skeleton
                                variant="rounded"
                                width={75}
                                height={10}
                            />
                            <Skeleton
                                variant="rounded"
                                width={40}
                                height={10}
                            />
                            <Skeleton
                                variant="rounded"
                                width={60}
                                height={10}
                            />
                            {/* <p>
                                {
                                    invoiceDetails?.[invoiceNumber]?.sender
                                        ?.companyDetails?.address
                                }
                            </p>
                            <p>
                                {
                                    invoiceDetails?.[invoiceNumber]?.sender
                                        ?.companyDetails?.city
                                }
                            </p>
                            <p>
                                {
                                    invoiceDetails?.[invoiceNumber]?.sender
                                        ?.companyDetails?.postCode
                                }
                            </p>
                            <p>
                                {
                                    invoiceDetails?.[invoiceNumber]?.sender
                                        ?.companyDetails?.country
                                }
                            </p> */}
                        </div>
                    </div>
                    <div className="invoice-details-body">
                        <div className="invoice-details-dates">
                            <div className="invoice-details-date">
                                <Skeleton
                                    variant="rounded"
                                    width={65}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={80}
                                    height={14}
                                />
                                {/* <span>Invoice Date</span>
                                <h3>
                                    {dayjs(
                                        invoiceDetails?.[invoiceNumber]
                                            ?.invoiceDate,
                                    ).format("DD MMM YYYY")}
                                </h3> */}
                            </div>
                            <div className="invoice-details-due-date">
                                <Skeleton
                                    variant="rounded"
                                    width={65}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={80}
                                    height={14}
                                />
                                {/* <span>Payment Due</span>
                                <h3>
                                    {dayjs(
                                        invoiceDetails?.[invoiceNumber]
                                            ?.dueDate,
                                    ).format("DD MMM YYYY")}
                                </h3> */}
                            </div>
                        </div>
                        <div className="invoice-details-client-info">
                            <div className="invoice-details-client-name">
                                <Skeleton
                                    variant="rounded"
                                    width={36}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={80}
                                    height={14}
                                />
                                {/* <span>Bill To</span>
                                <h3>
                                    {
                                        invoiceDetails?.[invoiceNumber]
                                            ?.clientName
                                    }
                                </h3> */}
                            </div>
                            <div className="invoice-details-client-address">
                                <Skeleton
                                    variant="rounded"
                                    width={120}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={75}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={40}
                                    height={10}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={60}
                                    height={10}
                                />
                                {/* <p>
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
                                </p> */}
                            </div>
                        </div>
                        <div className="invoice-details-client-email-skeleton">
                            <Skeleton
                                variant="rounded"
                                width={40}
                                height={10}
                            />
                            <Skeleton
                                variant="rounded"
                                width={120}
                                height={14}
                            />
                            {/* <span>Sent to</span>
                            <h3>
                                {invoiceDetails?.[invoiceNumber]?.clientEmail}
                            </h3> */}
                        </div>
                    </div>
                    <div className="invoice-details-footer">
                        <div className="invoice-details-footer-pricing">
                            <div className="invoice-details-footer-pricing-header">
                                <p></p>
                                <Skeleton
                                    variant="rounded"
                                    width="26px !important"
                                    height={14}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width="26px !important"
                                    height={14}
                                />
                                <Skeleton
                                    variant="rounded"
                                    sx={{ width: "26px" }}
                                    width="26px !important"
                                    height={14}
                                />
                            </div>
                            {invoiceDetails?.[invoiceNumber] &&
                                invoiceDetails?.[invoiceNumber]?.items.map(
                                    (item, ind) => (
                                        <div
                                            key={ind}
                                            className="invoice-details-footer-pricing-item"
                                        >
                                            <h4>{item.itemName}</h4>
                                            <h4 className="qty">{item.qty}</h4>
                                            <h4 className="price">
                                                $ {item.price}
                                            </h4>
                                            <h4>$ {item.total}</h4>
                                        </div>
                                    ),
                                )}
                        </div>
                        <div className="invoice-details-footer-due">
                            <p>Amount Due</p>
                            <h2>$ {invoiceDetails?.[invoiceNumber]?.total}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailedInvoice;
