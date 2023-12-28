import Category from "./Category";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  inventory: number;
  category: Category;
  images: string[];
}

export default Product;
