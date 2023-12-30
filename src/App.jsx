import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./Hooks/RequireAuth";
import Auth from "./Hooks/Auth";
import SidePanel from "./Components/SidePanel";

// Lazy-loaded components
const Home = lazy(() => import("./Pages/Home"));
const DetailedInvoice = lazy(() => import("./Pages/DetailedInvoice"));
const CompanyDetails = lazy(() => import("./Pages/CompanyDetails"));
const Login = lazy(() => import("./Pages/login"));
const Signup = lazy(() => import("./Pages/signup"));

function App() {
    const location = useLocation();
    const isAuthRoute =
        location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            {!isAuthRoute && <SidePanel />}
            <Toaster />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/invoice/:invoiceNumber"
                        element={
                            <RequireAuth>
                                <DetailedInvoice />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/profile-details"
                        element={
                            <RequireAuth>
                                <CompanyDetails />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Auth>
                                <Login />
                            </Auth>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Auth>
                                <Signup />
                            </Auth>
                        }
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
