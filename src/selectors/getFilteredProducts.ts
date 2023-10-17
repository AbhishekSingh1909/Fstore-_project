import Product from "../types/Product";

const getFilteredProducts = (products: Product[], search?: string) => {
  return products.filter((p) =>
    p.title.toLowerCase().includes(search?.toLowerCase() || "")
  );
};

export default getFilteredProducts;
