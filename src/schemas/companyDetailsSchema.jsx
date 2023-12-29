import * as yup from "yup";

export const companyDetailsSchema = yup.object().shape({
    name: yup.string().max(500).required("Required"),
    address: yup.string().max(500).required("Required"),
    city: yup.string().max(500).required("Required"),
    postCode: yup.string().max(500).required("Required"),
    country: yup.string().max(500).required("Required"),
});
