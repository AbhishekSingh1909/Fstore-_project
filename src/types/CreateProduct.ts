import { CreateProductImage } from "./CreateProductImage";

export interface CreateProduct {
  title: string;
  price: number;
  inventory: number;
  description: string;
  categoryId: string;
  images: CreateProductImage[];
}

export interface CreateProductWithAccessToken {
  createProduct: Partial<CreateProduct>;
  access_token: string | null;
}
