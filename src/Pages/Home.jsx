import "./css/home.css";
import { useEffect, useState, useContext } from "react";
import { axiosPrivate } from "../api/axios";
import invoicesOverviewContext from "../context/invoiceOverview";
import addInvoiceIcon from "../assets/images/icon-add-invoice.svg";
import noInvoicesIcon from "../assets/images/illustration-empty.svg";
import SidePanel from "../Components/SidePanel";
import Invoice from "../Components/Invoice";
import InvoicePanel from "../Components/InvoicePanel";
import Button from "../Components/Button";
import { useParams } from "react-router-dom";
const Home = () => {
    const { isLoading, invoicesOverview, setInvoicesOverview } = useContext(
        invoicesOverviewContext,
    );
    const { invoiceNumber } = useParams();
    console.log(invoiceNumber);
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
                        <p>There are 7 total invoices</p>
                    </div>
                    <Button
                        text="New Invoice"
                        onClick={toggleInvoicePanel}
                        img={addInvoiceIcon}
                    />
                    {/* <div
                        onClick={toggleInvoicePanel}
                        className="new-invoice-button"
                    >
                        <img src={addInvoiceIcon} alt="Add Invoice" />
                        <h4>New Invoice</h4>
                    </div> */}
                </div>
                <div className="invoices-main">
                    {invoicesOverview &&
                        invoicesOverview.map((invoiceOverview) => (
                            <Invoice
                                key={invoiceOverview.invoiceNumber}
                                invoiceNumber={invoiceOverview.invoiceNumber}
                                name={invoiceOverview.clientName}
                                total={invoiceOverview.total}
                                dueDate={invoiceOverview.dueDate}
                                status={invoiceOverview.status}
                            />
                        ))}
                    {/* <Invoice status="Paid" />
                    <Invoice status="Pending" />
                    <Invoice status="Pending" />
                    <Invoice status="Draft" />
                    <Invoice status="Pending" /> */}
                </div>
                {/* <div className="empty-invoices">
                    <img src={noInvoicesIcon} alt="No Invoices" />
                    <h2>There is nothing here</h2>
                    <span>
                        Create an invoice by clicking the{" "}
                        <span style={{ fontWeight: "700" }}>New Invoice</span>{" "}
                        button and get started
                    </span>
                </div> */}
            </div>
        </>
    );
};

export default Home;

// https://chat.openai.com/share/558f9eb9-7098-417b-a95c-d7ab3dfaa8ea
