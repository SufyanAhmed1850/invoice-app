import "./css/signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../schemas/signupSchema";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Input from "../Components/Input";
import Button from "../Components/Button";
import logoLarge from "../assets/images/logo-invoice.svg";

const Signup = () => {
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
        useFormik({
            initialValues: {
                email: "",
                password: "",
                repeatPassword: "",
            },
            validationSchema: signupSchema,
            onSubmit: (values, actions) => {
                userSignUp(values, actions);
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

    const userSignUp = (values, actions) => {
        const registration = axios
            .post(import.meta.env.VITE_BE_URL + "/signup", values)
            .then((response) => {
                console.log(response);
                Cookies.set("jwt", response.data.token, { expires: 7 });
                actions.resetForm();
                navigate("/profile-details");
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
        toast.promise(
            registration,
            {
                loading: "Signing up...",
                success: "Signed in successfully!",
                error: (err) => err.response.data.message,
            },
            {
                style: {
                    background: "var(--8)",
                    color: "var(--0)",
                },
                loading: {
                    position: "bottom-center",
                },
                success: {
                    duration: 2000,
                    position: "bottom-center",
                },
                error: {
                    duration: 2000,
                    position: "bottom-center",
                },
            },
        );
    };

    return (
        <div className="signup-container">
            <div className="auth-logo">
                <img src={logoLarge} alt="Logo" />
            </div>
            <div className="signup-card">
                <div className="signup-head">
                    <h2>Create account</h2>
                    <p>Let’s get you started sharing your links!</p>
                </div>
                <div className="signup-fields">
                    <Input
                        value={values.email}
                        error={errors.email}
                        touched={touched.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="email"
                        label="Email address"
                        handleEnterKeyPress
                        placeholder="e.g. alex@email.com"
                        onKeyDown={handleEnterKeyPress}
                        type="email"
                    />
                    <Input
                        value={values.password}
                        error={errors.password}
                        touched={touched.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="password"
                        label="Create password"
                        type="password"
                        placeholder="At least 8 characters"
                        onKeyDown={handleEnterKeyPress}
                    />
                    <Input
                        value={values.repeatPassword}
                        error={errors.repeatPassword}
                        touched={touched.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="repeatPassword"
                        label="Confirm password"
                        type="password"
                        placeholder="At least 8 characters"
                        onKeyDown={handleEnterKeyPress}
                    />

                    <Button
                        onClick={handleSave}
                        text="Sign up"
                        bgColor={"var(--1)"}
                    />
                    <p className="auth-para">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="create-account"
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
