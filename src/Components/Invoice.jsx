import "./css/invoice.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import InvoiceStatus from "./InvoiceStatus";
import iconArrowRight from "../assets/images/icon-arrow-right.svg";

const Invoice = ({ invoiceNumber, status, name, total, dueDate }) => {
    const navigate = useNavigate();
    // 19 Aug 2021

    return (
        <>
            <motion.div
                whileTap={{ scale: 1 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => navigate(`/invoice/${invoiceNumber}`)}
                className="invoice"
            >
                <div className="invoice-content">
                    <h4>
                        <span>#</span>
                        {invoiceNumber}
                    </h4>
                    <span>Due {dayjs(dueDate).format("DD MMM YYYY")}</span>
                    <span>{name}</span>
                    <h3>$ {total}</h3>
                    <InvoiceStatus status={status} />
                </div>
                <div className="invoice-arrow">
                    <img src={iconArrowRight} alt="Right Arrow" />
                </div>
            </motion.div>
        </>
    );
};

export default Invoice;
