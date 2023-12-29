import "./css/companydetails.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { axiosPrivate } from "../api/axios";
import { companyDetailsSchema } from "../schemas/companyDetailsSchema.jsx";
import toast from "react-hot-toast";
import Input from "../Components/Input";
import Button from "../Components/Button.jsx";
import leftArrowIcon from "../assets/images/icon-arrow-left.svg";

const CompanyDetails = () => {
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
        useFormik({
            initialValues: {
                name: "",
                address: "",
                city: "",
                postCode: "",
                country: "",
            },
            validationSchema: companyDetailsSchema,
            onSubmit: (values, actions) => {
                console.log("Form submitted with values:", values);
                saveCompantDetails(values, actions);
            },
        });
    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };
    const handleSaveClick = () => {
        console.log(errors);
        handleSubmit();
    };
    const saveCompantDetails = (values, actions) => {
        const companyDetails = values;
        console.log(companyDetails);
        const savePromise = axiosPrivate
            .post("/company-details", {
                companyDetails,
            })
            .then((response) => {
                console.log(response);
                actions.resetForm();
            })
            .catch((error) => {
                console.error(error);
            });
        toast.promise(
            savePromise,
            {
                loading: "Saving...",
                success: "Saved successfully!",
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
        <>
            <div className="company-details-parent">
                <Button
                    text="Go back"
                    color="var(--8)"
                    bgColor="transparent"
                    img={leftArrowIcon}
                    onClick={() => navigate("/")}
                />
                {/* <div className="back-to-home">
                    <img src={leftArrowIcon} alt="Left Arrow" />
                    <h4>Go back</h4>
                </div> */}
                <div className="company-details-main">
                    <div className="company-details-head">
                        <h1>Company Details</h1>
                        <h3>Add your company details</h3>
                    </div>
                    <div className="company-details-input-1">
                        <Input
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="name"
                            type="text"
                            label="Name"
                            error={errors.name}
                            touched={touched.name}
                        />
                        {/* <div className="logo-input-parent">
                            <div className="label-head">
                                <p style={{ color: "var(--7)" }}>Logo</p>
                            </div>
                            <div className="logo-input">
                                <img src={galleryIcon} alt="Company Logo" />
                            </div>
                        </div> */}
                    </div>
                    <div className="company-details-input-2">
                        <Input
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="address"
                            type="text"
                            label="Street Address"
                            error={errors.address}
                            touched={touched.address}
                        />
                    </div>
                    <div className="company-details-input-3">
                        <Input
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="city"
                            type="text"
                            label="City"
                            error={errors.city}
                            touched={touched.city}
                        />
                        <Input
                            value={values.postCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="postCode"
                            type="text"
                            label="Post Code"
                            error={errors.postCode}
                            touched={touched.postCode}
                        />
                        <Input
                            value={values.country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={handleEnterKeyPress}
                            id="country"
                            type="text"
                            label="Country"
                            error={errors.country}
                            touched={touched.country}
                        />
                    </div>
                </div>
                <div className="company-details-save">
                    <Button text="Save" onClick={handleSaveClick} />
                </div>
            </div>
        </>
    );
};

export default CompanyDetails;
