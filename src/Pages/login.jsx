import "./css/login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { loginSchema } from "../schemas/loginSchema";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Button from "../Components/Button";
import Input from "../Components/Input";
import logoLarge from "../assets/images/logo-invoice.svg";
import invoicesOverviewContext from "../context/invoiceOverview";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const to = location?.state?.from?.pathname || "/";
    const { setIsLoading, getInvoicesOverview } = useContext(
        invoicesOverviewContext,
    );
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
            },
            validationSchema: loginSchema,
            onSubmit: (values, actions) => {
                loginUser(values, actions);
            },
        });

    const handleSave = () => {
        console.log(errors);
        handleSubmit();
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const loginUser = (values, actions) => {
        setLoading(true);
        const authenticate = axios
            .post(import.meta.env.VITE_BE_URL + "/login", values)
            .then((response) => {
                console.log(response);
                Cookies.set("jwt", response.data.token, { expires: 7 });
                setIsLoading(true);
                getInvoicesOverview(1);
                actions.resetForm();
                navigate(to, { replace: true });
            })
            .catch((error) => {
                console.error(error);
                toast.error(error?.response?.data?.message || error.message);
                return Promise.reject(error);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="login-container">
            <div className="auth-logo">
                <img src={logoLarge} alt="Logo" />
            </div>
            <div className="login-card">
                <div className="login-head">
                    <h2>Login</h2>
                    <p>Add your details below to get back into the app</p>
                </div>
                <div className="login-fields">
                    <Input
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="email"
                        label="Email address"
                        placeholder="e.g. alex@email.com"
                        type="email"
                        onKeyDown={handleEnterKeyPress}
                    />
                    <Input
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        onKeyDown={handleEnterKeyPress}
                    />

                    <Button
                        loading={loading}
                        onClick={handleSave}
                        text="Login"
                        bgColor={"var(--1)"}
                    />
                    <p className="auth-para">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="create-account"
                        >
                            Create account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
