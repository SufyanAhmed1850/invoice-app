import "./css/home.css";
import { useState, useContext } from "react";
import invoicesOverviewContext from "../context/invoiceOverview";
import addInvoiceIcon from "../assets/images/icon-add-invoice.svg";
import Invoice from "../Components/Invoice";
import { motion, AnimatePresence } from "framer-motion";
import InvoicePanel from "../Components/InvoicePanel";
import Button from "../Components/Button";
const Home = () => {
    const { invoicesOverview } = useContext(invoicesOverviewContext);
    const [showInvoicePanel, setShowInvoicePanel] = useState(false);
    const toggleInvoicePanel = () => {
        setShowInvoicePanel(!showInvoicePanel);
    };

    return (
        <>
            <InvoicePanel
                isOpen={showInvoicePanel}
                onClose={toggleInvoicePanel}
                edit="false"
            />
            <div className="invoices-parent">
                <div className="invoices-head">
                    <div className="invoices-title">
                        <h1>Invoices</h1>
                        {invoicesOverview?.length > 0 ? (
                            <p>
                                There are {invoicesOverview?.length} total
                                invoices
                            </p>
                        ) : (
                            <p>No invoices</p>
                        )}
                    </div>
                    <Button
                        text="New Invoice"
                        onClick={toggleInvoicePanel}
                        img={addInvoiceIcon}
                    />
                </div>
                {invoicesOverview?.length > 0 ? (
                    <div className="invoices-main">
                        <AnimatePresence>
                            {invoicesOverview &&
                                invoicesOverview.map(
                                    (invoiceOverview, index) => (
                                        <motion.div
                                            layout
                                            key={invoiceOverview.invoiceNumber}
                                            initial={{ opacity: 0, x: -25 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 25 }}
                                            transition={{
                                                layout: {
                                                    duration: 0.5,
                                                    type: "spring",
                                                },
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
                                                total={invoiceOverview.total}
                                                dueDate={
                                                    invoiceOverview.dueDate
                                                }
                                                status={invoiceOverview.status}
                                            />
                                        </motion.div>
                                    ),
                                )}
                        </AnimatePresence>
                    </div>
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
