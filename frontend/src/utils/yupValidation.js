import * as Yup from "yup";

export const packageYup = {
  description: Yup.string().required("Required field"),
  weight: Yup.string().required("Required field"),
  height: Yup.string().required("Required field"),
  from_name: Yup.string().required("Required field"),
  from_address: Yup.string().required("Required field"),
};

export const deliveryYup = {
  package_id: Yup.string().required("Required field"),
};
