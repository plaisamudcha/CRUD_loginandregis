import * as Yup from "yup";

export const SchemaLogin = Yup.object({
  email: Yup.string().email().max(30).required("Put your email"),
  password: Yup.string().required("Put your password"),
});
