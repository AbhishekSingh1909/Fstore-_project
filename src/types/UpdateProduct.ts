interface UpdateProduct {
  id: string;
  updateProduct: Partial<ProductDto>;
}

export interface ProductDto {
  title: string;
  price: number;
  inventory: number,
  description: string;
  categoryId: string;
}

export default UpdateProduct;
