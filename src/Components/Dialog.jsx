import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import "./css/dialog.css";
import Button from "./Button";

const Dialog = ({ setShowDialog, onClose, onClick }) => {
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
                    {/* <div className="invoice-edit" onClick={onClose}>
                        <h4>Cancel</h4>
                    </div> */}
                    <Button
                        text="Delete"
                        bgColor="var(--9)"
                        color="var(--0)"
                        onClick={onClick}
                    />
                    {/* <div
                        onClick={() => setShowDialog(true)}
                        className="invoice-delete"
                        >
                        <h4>Delete</h4>
                    </div> */}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dialog;
