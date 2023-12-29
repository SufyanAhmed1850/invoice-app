import * as yup from "yup";

export const signupSchema = yup.object().shape({
    email: yup.string().email("Invalid email").max(500).required("Required"),
    password: yup.string().min(6).max(500).required("Required"),
    repeatPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
});
