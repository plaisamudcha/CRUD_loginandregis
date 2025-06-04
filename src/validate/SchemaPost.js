import * as Yup from "yup";

export const schemaPost = Yup.object({
  title: Yup.string().required("Put your title"),
  content: Yup.string().required("Put your content"),
  imgUrl: Yup.string().url().required("Put your image"),
});
