import "./css/sidepanel.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import sidePanelLogoIcon from "../assets/images/logo-side-panel.svg";
import darkThemeIcon from "../assets/images/icon-moon.svg";
import profileIcon from "../assets/images/image-avatar.svg";
import { AnimatePresence, motion } from "framer-motion";

const SidePanel = () => {
    const navigate = useNavigate();
    return (
        <AnimatePresence>
            <motion.div
                key="side-panel"
                initial={{ x: "-50px", opacity: 0 }}
                animate={{
                    x: 0,
                    transition: {
                        type: "spring",
                        stiffness: 250,
                        damping: 40,
                    },
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                    x: "-50px",
                }}
                className="side-panel"
            >
                <div className="side-panel-logo">
                    <img src={sidePanelLogoIcon} alt="Logo" />
                </div>
                <div className="side-panel-options">
                    <IconButton className="side-panel-theme">
                        <img src={darkThemeIcon} alt="Dark Theme" />
                    </IconButton>
                    <div className="side-panel-profile">
                        <IconButton
                            onClick={() => navigate("/profile-details")}
                            className="side-panel-profile-icon"
                        >
                            <img src={profileIcon} alt="Profile Avatar" />
                        </IconButton>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SidePanel;
