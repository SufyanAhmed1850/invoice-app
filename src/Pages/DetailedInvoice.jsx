import "./css/detailedinvoice.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import invoiceDetailsContext from "../context/invoice";
import invoicesOverviewContext from "../context/invoiceOverview";
import { AnimatePresence } from "framer-motion";
import InvoiceStatus from "../Components/invoiceStatus";
import SidePanel from "../Components/SidePanel";
import Dialog from "../Components/Dialog";
import Button from "../Components/Button";
import leftArrowIcon from "../assets/images/icon-arrow-left.svg";
import { useParams } from "react-router-dom";
import InvoicePanel from "../Components/InvoicePanel";
import { axiosPrivate } from "../api/axios";

const DetailedInvoice = () => {
    const { invoiceNumber } = useParams();
    const { setInvoiceNum } = useContext(invoiceDetailsContext);
    const { invoiceDetails, setInvoiceDetails } = useContext(
        invoiceDetailsContext,
    );

    const { invoicesOverview, setInvoicesOverview } = useContext(
        invoicesOverviewContext,
    );
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);
    const [showInvoicePanel, setShowInvoicePanel] = useState(false);
    const toggleInvoicePanel = () => {
        setShowInvoicePanel(!showInvoicePanel);
    };

    const handleDialogClose = () => {
        setShowDialog(false);
    };

    useEffect(() => {
        setInvoiceNum(invoiceNumber);
    }, []);

    const deleteInvoice = () => {
        const _id = invoiceDetails?.[invoiceNumber]?._id;
        console.log(_id);
        axiosPrivate
            .delete(`/invoice/delete/${_id}`)
            .then((response) => {
                console.log(response);
                const updatedInvoiceDetails = { ...invoiceDetails };
                delete updatedInvoiceDetails[invoiceNumber];
                setInvoicesOverview((prevInvoicesOverview) =>
                    prevInvoicesOverview.filter(
                        (item) => item.invoiceNumber != invoiceNumber,
                    ),
                );
                navigate("/");
                setInvoiceDetails(updatedInvoiceDetails);
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
                const indexToUpdate = invoicesOverview.findIndex(
                    (index) => index.invoiceNumber == invoiceNumber,
                );
                setInvoiceDetails({
                    ...invoiceDetails,
                    [invoiceNumber]: {
                        ...invoiceDetails[invoiceNumber],
                        status: "Paid",
                    },
                });

                setInvoicesOverview(
                    invoicesOverview.map((item, index) => {
                        if (index === indexToUpdate) {
                            return {
                                ...item,
                                status: "Paid",
                            };
                        }
                        return item;
                    }),
                );
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
                    onClick={() => navigate("/")}
                />
                {/* <div className="back-to-home">
                    <img src={leftArrowIcon} alt="Left Arrow" />
                    <h4>Go back</h4>
                </div> */}
                <div className="invoice-details-crud">
                    <div className="invoice-details-status">
                        <span>Status</span>
                        <InvoiceStatus
                            status={invoiceDetails?.[invoiceNumber]?.status}
                        />
                    </div>
                    <div className="invoice-details-edit">
                        <Button
                            onClick={toggleInvoicePanel}
                            text="Edit"
                            bgColor="#f9fafe"
                            color="var(--7)"
                        />
                        {/* <div className="invoice-edit">
                            <h4>Edit</h4>
                        </div> */}
                        <Button
                            text="Delete"
                            bgColor="var(--9)"
                            color="var(--0)"
                            onClick={() => setShowDialog(true)}
                        />
                        {/* <div
                            onClick={() => setShowDialog(true)}
                            className="invoice-delete"
                        >
                            <h4>Delete</h4>
                        </div> */}
                        <Button
                            onClick={markAsPaid}
                            text="Mark as Paid"
                            bgColor="var(--1)"
                            color="var(--0)"
                        />
                        {/* <div className="invoice-update">
                            <h4>Mark as Paid</h4>
                        </div> */}
                    </div>
                </div>
                <div className="invoice-details">
                    <div className="invoice-details-header">
                        <div className="invoice-details-meta">
                            <h3>
                                <span>#</span>
                                {invoiceDetails?.[invoiceNumber]?.invoiceNumber}
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
                                {invoiceDetails?.[invoiceNumber]?.clientEmail}
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
                            {/* <div className="invoice-details-footer-pricing-item">
                                <h4>Banner Design</h4>
                                <h4 className="qty">1</h4>
                                <h4 className="price">£ 156.00</h4>
                                <h4>£ 156.00</h4>
                            </div>
                            <div className="invoice-details-footer-pricing-item">
                                <h4>Email Design</h4>
                                <h4 className="qty">2</h4>
                                <h4 className="price">£ 200.00</h4>
                                <h4>£ 400.00</h4>
                            </div> */}
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
