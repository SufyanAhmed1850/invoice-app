import "./css/invoice.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import InvoiceStatus from "./InvoiceStatus";
import iconArrowRight from "../assets/images/icon-arrow-right.svg";
import { Skeleton } from "@mui/material";
import invoicesOverviewContext from "../context/invoiceOverview";
import { useContext } from "react";

const Invoice = ({ invoiceNumber, status, name, total, dueDate }) => {
    const { isLoading } = useContext(invoicesOverviewContext);
    const navigate = useNavigate();

    return (
        <>
            <motion.div
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                    const { pathname, search, hash: currentHash } = location; // Destructure for clarity
                    navigate(`/invoice/${invoiceNumber}`, {
                        state: {
                            from: {
                                pathname,
                                search,
                                hash: currentHash,
                                redirect: search
                                    ? `${pathname}${search}`
                                    : pathname,
                            },
                        },
                    });
                }}
                className="invoice"
            >
                {isLoading ? (
                    <>
                        <div className="invoice-content">
                            <Skeleton animation="wave" height={24} />
                            <Skeleton animation="wave" height={24} />
                            <Skeleton animation="wave" height={24} />
                            <Skeleton animation="wave" height={24} />
                            <Skeleton
                                animation="wave"
                                sx={{ borderRadius: "6px" }}
                                height={38}
                            />
                        </div>
                        <div className="invoice-arrow">
                            <Skeleton
                                animation="wave"
                                width={16}
                                height={26.675}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="invoice-content">
                            <h4>
                                <span>#</span>
                                {invoiceNumber}
                            </h4>
                            <span>
                                Due {dayjs(dueDate).format("DD MMM YYYY")}
                            </span>
                            <span>{name}</span>
                            <h3>$ {total}</h3>
                            <InvoiceStatus status={status} />
                        </div>
                        <div className="invoice-arrow">
                            <img src={iconArrowRight} alt="Right Arrow" />
                        </div>
                    </>
                )}
            </motion.div>
        </>
    );
};

export default Invoice;
