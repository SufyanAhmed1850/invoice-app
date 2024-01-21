import "./css/invoice.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import InvoiceStatus from "./InvoiceStatus";
import iconArrowRight from "../assets/images/icon-arrow-right.svg";
import { Skeleton } from "@mui/material";
import invoicesOverviewContext from "../context/invoiceOverview";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";

const Invoice = ({ invoiceNumber, status, name, total, dueDate }) => {
    const navigate = useNavigate();
    const { isLoading } = useContext(invoicesOverviewContext);
    const isMediumScreen = useMediaQuery({ maxWidth: 630 });

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
                    !isMediumScreen ? (
                        <>
                            <div className="invoice-content skeleton">
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
                            <div className="invoice-content-skeleton">
                                <Skeleton
                                    className="invoice-content-skeleton-odd"
                                    animation="wave"
                                    width={75}
                                    height={24}
                                />
                                <Skeleton
                                    className="invoice-content-skeleton-even"
                                    animation="wave"
                                    width={75}
                                    height={24}
                                />
                                <Skeleton
                                    className="invoice-content-skeleton-odd"
                                    animation="wave"
                                    width={100}
                                    height={24}
                                />
                                <Skeleton
                                    className="invoice-content-skeleton-even"
                                    animation="wave"
                                    width={105}
                                    height={40}
                                />
                                <Skeleton
                                    className="invoice-content-skeleton-odd"
                                    animation="wave"
                                    sx={{ borderRadius: "6px" }}
                                    width={50}
                                    height={24}
                                />
                            </div>
                        </>
                    )
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
                        {!isMediumScreen && (
                            <div className="invoice-arrow">
                                <img src={iconArrowRight} alt="Right Arrow" />
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </>
    );
};

export default Invoice;
