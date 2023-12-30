import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import DetailedInvoice from "./Pages/DetailedInvoice";
import CompanyDetails from "./Pages/CompanyDetails";
import Login from "./Pages/login";
import Signup from "./Pages/signup";
import RequireAuth from "./Hooks/RequireAuth";
import Auth from "./Hooks/Auth";
import SidePanel from "./Components/SidePanel";
import { AnimatePresence, motion } from "framer-motion";

function App() {
    const pageVariants = {
        initial: {
            opacity: 0,
        },
        in: {
            opacity: 1,
        },
        out: {
            opacity: 0,
        },
    };

    const pageTransition = {
        ease: "anticipate",
        duration: 0.5,
    };
    const location = useLocation();
    const isAuthRoute =
        location.pathname === "/login" || location.pathname === "/signup";
    return (
        <>
            {!isAuthRoute && <SidePanel />}
            <Toaster />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                    <motion.div
                                        style={{
                                            width: "100%",
                                            height: "100svh",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants}
                                        transition={pageTransition}
                                    >
                                        <Home />
                                    </motion.div>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/invoice/:invoiceNumber"
                        element={
                            <RequireAuth>
                                    <motion.div
                                        style={{
                                            width: "100%",
                                            height: "100svh",
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={pageVariants}
                                        transition={pageTransition}
                                    >
                                        <DetailedInvoice />
                                    </motion.div>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile-details"
                        element={
                            <RequireAuth>
                                <motion.div
                                    style={{
                                        width: "100%",
                                        height: "100svh",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <CompanyDetails />
                                </motion.div>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Auth>
                                <motion.div
                                    style={{
                                        width: "100%",
                                        height: "100svh",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <Login />
                                </motion.div>
                            </Auth>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Auth>
                                <motion.div
                                    style={{
                                        width: "100%",
                                        height: "100svh",
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={pageVariants}
                                    transition={pageTransition}
                                >
                                    <Signup />
                                </motion.div>
                            </Auth>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
