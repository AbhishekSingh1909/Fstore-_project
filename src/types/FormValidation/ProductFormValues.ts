import { DefaultValues } from "react-hook-form";
import * as yup from "yup";

export interface FormValues {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images?: string | undefined | null;
}

export const formSchema = yup.object({
  title: yup.string().max(30).required("Required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price can't be negative")
    .required("Required"),
  description: yup.string().required("Required"),
  categoryId: yup.number().required("Required"),
  images: yup.string().nullable(),
});

export const defaultValues: DefaultValues<FormValues> = {
  title: "",
  price: undefined,
  description: "",
  categoryId: 0,
  images: null,
};
