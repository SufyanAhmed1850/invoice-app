import "./css/invoiceStatus.css";
import { useEffect, useState } from "react";

const InvoiceStatus = ({ status }) => {
    const [color, setColor] = useState();
    useEffect(() => {
        switch (status) {
            case "Paid": {
                setColor("#33d69f");
                break;
            }
            case "Pending": {
                setColor("#FF8F00");
                break;
            }
            case "Draft": {
                setColor("#373B53");
                break;
            }
            default: {
                break;
            }
        }
    }, [status]);
    return (
        <div
            style={{ backgroundColor: color + "12" }}
            className="invoice-status"
        >
            <div style={{ backgroundColor: color }} className="round"></div>
            <h4 style={{ color }}>{status}</h4>
        </div>
    );
};

export default InvoiceStatus;
