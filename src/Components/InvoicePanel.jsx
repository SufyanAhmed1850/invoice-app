import "./css/invoicepanel.css";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { axiosPrivate } from "../api/axios.js";
import { invoicePanelDataSchema } from "../schemas/invoicePanelDataSchema.jsx";
import invoiceDetailsContext from "../context/invoice.jsx";
import invoicesOverviewContext from "../context/invoiceOverview.jsx";
import Input from "../Components/Input";
import DeleteIcon from "../assets/images/DeleteIcon.jsx";
import Button from "./Button.jsx";
import toast from "react-hot-toast";

const InvoicePanel = ({ isOpen, onClose, edit, invoiceNumber }) => {
    const { invoiceDetails, setInvoiceDetails } = useContext(
        invoiceDetailsContext,
    );

    const { getInvoicesOverview, currentPage, setCurrentPage } = useContext(
        invoicesOverviewContext,
    );
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const {
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        resetForm,
        setFieldTouched,
        setErrors,
    } = useFormik({
        initialValues: {
            clientName:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientName
                    : "",
            clientEmail:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientEmail
                    : "",
            clientAddress:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientAddress
                    : "",
            clientCity:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientCity
                    : "",
            clientPostCode:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientPostCode
                    : "",
            clientCountry:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.clientCountry
                    : "",
            invoiceDate:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.invoiceDate
                    : dayjs().format(),
            paymentTerms:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.paymentTerms
                    : 1,
            projectDescription:
                edit == "true"
                    ? invoiceDetails?.[invoiceNumber]?.projectDescription
                    : "",
            items: [{ itemName: "", qty: "", price: "" }],
        },
        validationSchema: invoicePanelDataSchema,
        onSubmit: (values, actions) => {
            console.log("Form values:", values);
            edit == "true"
                ? editInvoice(values, actions)
                : saveInvoice(values, actions);
        },
    });

    useEffect(() => {
        if (edit === "true" && invoiceDetails?.[invoiceNumber]) {
            for (const key in invoiceDetails?.[invoiceNumber]) {
                if (key === "invoiceDate") {
                    const date = dayjs(
                        invoiceDetails?.[invoiceNumber]?.invoiceDate,
                    );
                    setFieldValue(key, date.isValid() ? date : dayjs());
                } else {
                    setFieldValue(key, invoiceDetails?.[invoiceNumber]?.[key]);
                }
            }
            if (invoiceDetails?.[invoiceNumber]?.items) {
                setFieldValue(
                    "items",
                    invoiceDetails?.[invoiceNumber]?.items.map((item) => ({
                        ...item,
                    })),
                );
            }
        }
    }, [edit, invoiceDetails?.[invoiceNumber], setFieldValue, isOpen]);

    const discardInvoiceData = () => {
        resetForm();
    };

    const handleSaveDraftClick = () => {
        const draftFormValues = {
            clientName: values.clientName,
            clientEmail: values.clientEmail,
            clientAddress: values.clientAddress,
            clientCity: values.clientCity,
            clientPostCode: values.clientPostCode,
            clientCountry: values.clientCountry,
            invoiceDate: values.invoiceDate,
            paymentTerms: values.paymentTerms,
            projectDescription: values.projectDescription,
            items: values.items,
            status: "Draft",
        };
        onClose();
        resetForm();
        saveDraft(draftFormValues);
    };

    const saveDraft = (values) => {
        let formattedDueDate = "";
        if (values.invoiceDate && values.paymentTerms) {
            const createDate = dayjs(values.invoiceDate);
            const dueDate = createDate.add(values.paymentTerms, "day");
            formattedDueDate = dueDate.format();
        }

        let totalOfItemsPrices = 0;
        let itemTotal = 0;
        const updatedItems = values.items.map((item) => {
            if (item.qty && item.price) {
                itemTotal = item.qty * item.price;
            } else {
                item.qty = 0;
                item.price = 0;
                itemTotal = 0;
            }
            totalOfItemsPrices += itemTotal;
            return {
                ...item,
                total: itemTotal,
            };
        });

        const invoiceDetails = {
            ...values,
            items: updatedItems,
            total: totalOfItemsPrices,
            dueDate: formattedDueDate,
        };
        console.log(invoiceDetails);
        const draftPromise = axiosPrivate
            .post("/invoice", {
                invoiceDetails,
            })
            .then((response) => {
                console.log(response?.data?.invoice);
                setCurrentPage(1);
                getInvoicesOverview(1);
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
        toast.promise(
            draftPromise,
            {
                loading: "Saving Draft...",
                success: "Draft Saved successfully!",
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

    const handleSaveClick = () => {
        console.log(errors);
        handleSubmit();
    };

    const editInvoice = (values, actions) => {
        const createDate = dayjs(values.invoiceDate);
        const dueDate = createDate.add(values.paymentTerms, "day");
        const formattedDueDate = dueDate.format();

        let totalOfItemsPrices = 0;
        const updatedItems = values.items.map((item) => {
            const itemTotal = item.qty * item.price;
            totalOfItemsPrices += itemTotal;
            return {
                ...item,
                total: itemTotal,
            };
        });

        const editedInvoiceDetails = {
            ...values,
            items: updatedItems,
            total: totalOfItemsPrices,
            dueDate: formattedDueDate,
            status: "Pending",
        };
        delete editedInvoiceDetails.sender;
        console.log("EDIT VALUES: ", editedInvoiceDetails);

        const editPromise = axiosPrivate
            .put("/invoice/edit", editedInvoiceDetails)
            .then((response) => {
                getInvoicesOverview(currentPage);
                onClose();
                console.log(response);
                setInvoiceDetails({
                    ...invoiceDetails,
                    [invoiceNumber]: editedInvoiceDetails,
                });
                edit == "true" || actions.resetForm();
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
            });
        toast.promise(
            editPromise,
            {
                loading: "Saving changes...",
                success: "Saved changes successfully!",
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

    const saveInvoice = (values, actions) => {
        const createDate = dayjs(values.invoiceDate);
        const dueDate = createDate.add(values.paymentTerms, "day");
        const formattedDueDate = dueDate.format();

        let totalOfItemsPrices = 0;
        const updatedItems = values.items.map((item) => {
            const itemTotal = item.qty * item.price;
            totalOfItemsPrices += itemTotal;
            return {
                ...item,
                total: itemTotal,
            };
        });

        const invoiceDetails = {
            ...values,
            items: updatedItems,
            total: totalOfItemsPrices,
            dueDate: formattedDueDate,
        };
        const savePromise = axiosPrivate
            .post("/invoice", {
                invoiceDetails,
            })
            .then((response) => {
                console.log(response?.data);
                setCurrentPage(1);
                getInvoicesOverview(1);
                onClose();
                edit == "true" || actions.resetForm();
            })
            .catch((error) => {
                console.error(error);
                return Promise.reject(error);
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

    const handleAddItem = () => {
        setFieldValue("items", [
            ...values.items,
            { itemName: "", qty: "", price: "" },
        ]);
        setErrors((prevErrors) => ({
            ...prevErrors,
            items: [...(prevErrors.items || []), {}],
        }));

        setFieldTouched("items", [...(touched.items || []), false], false);
    };

    const handleRemoveItem = (index) => {
        const newItems = [...values.items];
        if (newItems.length === 1) return;

        newItems.splice(index, 1);
        setFieldValue("items", newItems);

        const newErrors = errors.items ? [...errors.items] : [];
        const newTouched = touched.items ? [...touched.items] : [];

        newErrors.splice(index, 1);
        newTouched.splice(index, 1);

        setErrors((prevState) => ({
            ...prevState,
            items: newErrors,
        }));

        setFieldTouched("items", newTouched, true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <form onSubmit={handleSubmit}>
                    <motion.div
                        key="invoice-panel-parent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={() => {
                            {
                                edit == "true" || discardInvoiceData();
                            }
                            onClose();
                        }}
                        className="invoice-panel-background"
                    ></motion.div>
                    <motion.div
                        key="invoice-panel"
                        initial={{ x: "-100%", opacity: 0, width: "400px" }}
                        animate={{
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 250,
                                damping: 40,
                            },
                            opacity: 1,
                            width: "calc(50% + 104px)",
                        }}
                        exit={{
                            opacity: 0,
                            x: "-50px",
                        }}
                        className="invoice-panel-parent"
                    >
                        <div className="invoice-panel-main">
                            <h2>
                                {edit == "false"
                                    ? "New Invoice"
                                    : `Edit #${invoiceNumber}`}
                            </h2>
                            <h4 style={{ color: "var(--1)" }}>Bill To</h4>
                            <div className="invoice-panel-input-1">
                                <Input
                                    value={values.clientName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientName}
                                    touched={touched.clientName}
                                    id="clientName"
                                    type="text"
                                    label="Client’s Name"
                                />
                            </div>
                            <div className="invoice-panel-input-2">
                                <Input
                                    value={values.clientEmail}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientEmail}
                                    touched={touched.clientEmail}
                                    id="clientEmail"
                                    type="text"
                                    label="Client’s Email"
                                />
                            </div>
                            <div className="invoice-panel-input-3">
                                <Input
                                    value={values.clientAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientAddress}
                                    touched={touched.clientAddress}
                                    id="clientAddress"
                                    type="text"
                                    label="Street Address"
                                />
                            </div>
                            <div className="invoice-panel-input-4">
                                <Input
                                    value={values.clientCity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientCity}
                                    touched={touched.clientCity}
                                    id="clientCity"
                                    type="text"
                                    label="City"
                                />
                                <Input
                                    value={values.clientPostCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientPostCode}
                                    touched={touched.clientPostCode}
                                    id="clientPostCode"
                                    type="text"
                                    label="Post Code"
                                />
                                <Input
                                    value={values.clientCountry}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.clientCountry}
                                    touched={touched.clientCountry}
                                    id="clientCountry"
                                    type="text"
                                    label="Country"
                                />
                            </div>
                            <div className="invoice-panel-input-5">
                                <Input
                                    value={values.invoiceDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.invoiceDate}
                                    touched={touched.invoiceDate}
                                    id="invoiceDate"
                                    type="text"
                                    label="Invoice Date"
                                    setFieldValue={setFieldValue}
                                />
                                <Input
                                    value={values.paymentTerms}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.paymentTerms}
                                    touched={touched.paymentTerms}
                                    id="paymentTerms"
                                    type="text"
                                    label="Payment Terms"
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className="invoice-panel-input-6">
                                <Input
                                    value={values.projectDescription}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.projectDescription}
                                    touched={touched.projectDescription}
                                    id="projectDescription"
                                    type="text"
                                    label="Project Description"
                                />
                            </div>
                            <div className="invoice-panel-items-list">
                                <h4
                                    style={{
                                        color: "var(--1)",
                                        marginBottom: "16px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    Items List
                                </h4>
                                <div className="invoice-panel-items-names-body">
                                    <AnimatePresence>
                                        {values.items.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                {...(index !== 0 && {
                                                    initial: {
                                                        opacity: 0,
                                                        y: -5,
                                                        height: 0,
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0,
                                                        height: "auto",
                                                    },
                                                })}
                                                exit={{
                                                    opacity: 0,
                                                    y: -5,
                                                    height: 0,
                                                }}
                                                className="invoice-panel-items-names-inputs-parent"
                                            >
                                                <div className="invoice-panel-items-names-inputs">
                                                    <Input
                                                        flex="2"
                                                        value={item.itemName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={
                                                            errors.items?.[
                                                                index
                                                            ]?.itemName
                                                        }
                                                        touched={
                                                            touched.items?.[
                                                                index
                                                            ]?.itemName
                                                        }
                                                        id={`items[${index}].itemName`}
                                                        type="text"
                                                        label="Item Name"
                                                    />
                                                    <Input
                                                        flex="1"
                                                        value={item.qty}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={
                                                            errors.items?.[
                                                                index
                                                            ]?.qty
                                                        }
                                                        touched={
                                                            touched.items?.[
                                                                index
                                                            ]?.qty
                                                        }
                                                        id={`items[${index}].qty`}
                                                        type="text"
                                                        label="Qty."
                                                    />
                                                    <Input
                                                        flex="1"
                                                        value={item.price}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        error={
                                                            errors.items?.[
                                                                index
                                                            ]?.price
                                                        }
                                                        touched={
                                                            touched.items?.[
                                                                index
                                                            ]?.price
                                                        }
                                                        id={`items[${index}].price`}
                                                        type="text"
                                                        label="Price"
                                                    />

                                                    <h4
                                                        style={{
                                                            color: "var(--6)",
                                                            paddingTop: "22px",
                                                        }}
                                                    >
                                                        {item.qty *
                                                            item.price || "-"}
                                                    </h4>
                                                </div>
                                                <IconButton
                                                    onMouseOver={() =>
                                                        handleMouseOver(index)
                                                    }
                                                    onMouseOut={handleMouseOut}
                                                    className="invoice-panel-items-remove"
                                                    sx={{
                                                        marginTop: "22px",
                                                    }}
                                                    onClick={() =>
                                                        handleRemoveItem(index)
                                                    }
                                                >
                                                    <DeleteIcon
                                                        fill={
                                                            index ===
                                                            hoveredIndex
                                                                ? "var(--9)"
                                                                : "#888EB0"
                                                        }
                                                    />
                                                </IconButton>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                <Button
                                    text="+ Add New Item"
                                    bgColor="#f9fafe"
                                    color="var(--7)"
                                    onClick={handleAddItem}
                                />
                            </div>
                        </div>
                        <div className="invoice-panel-buttons">
                            <div className="invoice-panel-buttons-left">
                                {edit == "true" || (
                                    <Button
                                        onClick={
                                            edit == "true"
                                                ? null
                                                : discardInvoiceData
                                        }
                                        text="Discard"
                                        bgColor="#f9fafe"
                                        color="var(--7)"
                                    />
                                )}
                            </div>
                            <div className="invoice-panel-buttons-right">
                                <Button
                                    text={
                                        edit == "true"
                                            ? "Cancel"
                                            : "Save as Draft"
                                    }
                                    bgColor={
                                        edit == "true" ? "#f9fafe" : "#373b53"
                                    }
                                    color={
                                        edit == "true" ? "var(--7)" : "var(--5)"
                                    }
                                    onClick={handleSaveDraftClick}
                                />
                                <Button
                                    text={
                                        edit == "true"
                                            ? "Save Changes"
                                            : "Save & Send"
                                    }
                                    bgColor="var(--1)"
                                    color="var(--0)"
                                    onClick={handleSaveClick}
                                />
                            </div>
                        </div>
                    </motion.div>
                </form>
            )}
        </AnimatePresence>
    );
};

export default InvoicePanel;
