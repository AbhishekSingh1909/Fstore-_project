import { rest } from "msw";
import { setupServer } from "msw/node";

import { productsData } from "../dataSeed/productData.Seed";
import { CreateProduct } from "../../types/CreateProduct";
import Product from "../../types/Product";
import { categorydata } from "../dataSeed/categoryData.Seed";
import { ProductDto } from "../../types/UpdateProduct";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),
  rest.get("https://api.escuelajs.co/api/v1/products/:id", (req, res, ctx) => {
    const { id } = req.params;
    const product = productsData.find((p) => p.id === Number(id));
    if (product) {
      return res(ctx.json(product));
    }
  }),
  rest.get(
    "https://api.escuelajs.co/api/v1/categories/:id/products",
    (req, res, ctx) => {
      const { id } = req.params;
      const products = productsData.filter((p) => p.category.id === Number(id));
      if (products) {
        return res(ctx.json(products));
      }
    }
  ),
  rest.get("https://api.escuelajs.co/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(categorydata));
  }),
  rest.delete(
    "https://api.escuelajs.co/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;
      const index = productsData.find((p) => p.id === Number(id));
      if (index) {
        return res(ctx.json(true));
      } else {
        return res(ctx.json(false));
      }
    }
  ),
  rest.post(
    "https://api.escuelajs.co/api/v1/products/",
    async (req, res, ctx) => {
      const input: CreateProduct = await req.json();
      const category = categorydata.find((c) => c.id === input.categoryId);
      if (category && input.price > 0) {
        const newProduct: Product = {
          id: productsData.length + 1,
          title: input.title,
          price: input.price,
          description: input.description,
          images: input.images,
          category,
        };
        productsData.push(newProduct);
        return res(ctx.json(newProduct));
      } else {
        ctx.status(400);
        ctx.json({
          message: [
            "price must be a positive number",
            "images must contain at least 1 elements",
            "each value in images must be a URL address",
            "images must be an array",
          ],
          error: "Bad Request",
          statusCode: 400,
        });
      }
    }
  ),
  rest.put(
    "https://api.escuelajs.co/api/v1/products/:id",
    async (req, res, ctx) => {
      const updateProduct: ProductDto = await req.json();

      const { id } = req.params;
      const foundIndex = productsData.findIndex((p) => p.id === Number(id));
      if (foundIndex !== -1 && updateProduct.price > 0) {
        return res(
          ctx.json({
            ...productsData[foundIndex],
            ...updateProduct,
          })
        );
      } else {
        ctx.status(400);
        return res(
          ctx.json({
            message: [
              "price must be a positive number",
              "images must contain at least 1 elements",
              "each value in images must be a URL address",
              "images must be an array",
            ],
            error: "Bad Request",
            statusCode: 400,
          })
        );
      }
    }
  ),
];

const server = setupServer(...handlers);

export default server;
