import { DefaultValues } from "react-hook-form";
import * as yup from "yup";
export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
  avatar?: string | undefined | null;
}

export const formSchema = yup.object({
  name: yup.string().max(30).required("Required"),
  email: yup
    .string()
    .email("Email is not correct")
    .max(255)
    .required("Required"),
  password: yup
    .string()
    .min(5)
    .max(20)
    .required("Please create a stronger password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
  avatar: yup.string().nullable(),
});

export const defaultValues: DefaultValues<FormValues> = {
  name: "",
  email: "",
  password: "",
  confirm: "",
  avatar: null,
};
