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
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                className="side-panel"
            >
                <div className="side-panel-logo">
                    <img src={sidePanelLogoIcon} alt="Logo" />
                </div>
                <div className="side-panel-options">
                    <div className="side-panel-profile">
                        <IconButton
                            onClick={() => {
                                const {
                                    pathname,
                                    search,
                                    hash: currentHash,
                                } = location;
                                navigate("/profile-details", {
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
