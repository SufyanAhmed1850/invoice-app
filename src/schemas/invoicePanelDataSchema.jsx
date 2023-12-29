import * as yup from "yup";

export const invoicePanelDataSchema = () => {
    return yup.object().shape({
        clientName: yup.string().max(500).required("Required"),
        clientEmail: yup.string().max(500).required("Required"),
        clientAddress: yup.string().max(500).required("Required"),
        clientCity: yup.string().max(500).required("Required"),
        clientPostCode: yup.string().max(500).required("Required"),
        clientCountry: yup.string().max(500).required("Required"),
        invoiceDate: yup.string().required("Required"),
        paymentTerms: yup.number().required("Required"),
        projectDescription: yup.string().max(500).required("Required"),
        items: yup.array().of(
            yup.object().shape({
                itemName: yup.string().required("Required"),
                qty: yup
                    .number()
                    .typeError("Number")
                    .positive("Positive")
                    .integer("Integer")
                    .required("Required"),
                price: yup
                    .number()
                    .typeError("Number")
                    .positive("Positive")
                    .required("Required"),
            })
        ),
    });
};
