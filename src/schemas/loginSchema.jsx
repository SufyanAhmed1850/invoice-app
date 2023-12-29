import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").max(500).required("Required"),
    password: yup.string().min(6).max(500).required("Required"),
});
