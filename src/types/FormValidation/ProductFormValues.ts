import { DefaultValues } from "react-hook-form";
import * as yup from "yup";

export interface FormValues {
  title: string;
  price: number;
  inventory: number,
  description: string;
  categoryId: string;
  images?: string | undefined | null;
}

export const formSchema = yup.object({
  title: yup.string().max(30).required("Required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price can't be negative")
    .required("Required"),
  inventory: yup
    .number()
    .typeError("inventory must be a number")
    .positive("inventory can't be negative")
    .required("Required"),
  description: yup.string().required("Required"),
  categoryId: yup.string().required("Required"),
  images: yup.string().nullable(),
});

export const defaultValues: DefaultValues<FormValues> = {
  title: "",
  price: undefined,
  description: "",
  inventory: undefined,
  categoryId: "00000000-0000-0000-0000-000000000000",
  images: null,
};
