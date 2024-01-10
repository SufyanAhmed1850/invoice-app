import { motion } from "framer-motion";
import { useEffect } from "react";
import "./css/dialog.css";
import Button from "./Button";

const Dialog = ({ onClose, onClick, loading }) => {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest(".dialog")) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);
    return (
        <motion.div
            key="dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dialog-backdrop"
        >
            <motion.div
                key="dialog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="dialog"
            >
                <h2>Confirm Deletion</h2>
                <p>
                    Are you sure you want to delete invoice #XM9141? This action
                    cannot be undone.
                </p>
                <div className="dialog-btn">
                    <Button
                        text="Cancel"
                        bgColor="#F9FAFE"
                        color="var(--7)"
                        onClick={onClose}
                    />
                    <Button
                        loading={loading}
                        text="Delete"
                        bgColor="var(--9)"
                        color="var(--0)"
                        onClick={onClick}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dialog;
