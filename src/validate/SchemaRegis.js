import * as Yup from "yup";

export const schmeRegis = Yup.object({
  email: Yup.string().email().max(30).required("Put your email"),
  password: Yup.string()
    .min(6, "put greater than 6")
    .required("Put your password"),
  phone: Yup.string()
    .min(10, "10 numbers")
    .max(10, "10 numbers")
    .required("Put your phonenumber"),
});
