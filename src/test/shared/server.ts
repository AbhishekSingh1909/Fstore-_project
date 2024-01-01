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
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmMWVkN2MwNi04NGRiLTRmY2EtYjI5OS0wYWQ3YWE4ZWQ2NDMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDM0OTY5MzMsImV4cCI6MTcwMzY2OTczMywiaWF0IjoxNzAzNDk2OTMzLCJpc3MiOiJBYmhpc2hlayIsImF1ZCI6IkFiaGlzaGVrRUNvbW1lcmNlIn0.LRRatYF8RIZ6O5fswGM3DIbtOOeZiX6-ZVO4o0V5IEk';
const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};
export const handlers = [
  rest.get("http://localhost:5216/api/v1/products", (req, res, ctx) => {
    return res(ctx.json(productsData));
  }),
  rest.get("http://localhost:5216/api/v1/products/:id", (req, res, ctx) => {
    const { id } = req.params;
    const product = productsData.find((p) => p.id === id);
    if (product) {
      return res(ctx.json(product));
    }
  }),
  rest.get(
    "http://localhost:5216/api/v1/categories/:id/products",
    (req, res, ctx) => {
      const { id } = req.params;
      const products = productsData.filter((p) => p.category.id === id);
      if (products) {
        return res(ctx.json(products));
      }
    }
  ),
  rest.get("http://localhost:5216/api/v1/categories", (req, res, ctx) => {
    return res(ctx.json(categorydata));
  }),
  rest.delete(
    "http://localhost:5216/api/v1/products/:id",
    (req, res, ctx) => {
      const { id } = req.params;

      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');
      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const index = productsData.find((p) => p.id === id);
        if (index) {
          return res(ctx.json(true));
        } else {
          return res(ctx.json(false));
        }
      }
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }
    }
  ),
  rest.post(
    "http://localhost:5216/api/v1/products",
    async (req, res, ctx) => {
      const input: CreateProduct = await req.json();
      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');
      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const category = categorydata.find((c) => c.id === input.categoryId);
        if (category && input.price > 0) {
          const newProduct: Product = {
            id: "05f91d02-b419-4535-9f7c-840f31615df2",
            title: input.title,
            price: input.price,
            description: input.description,
            images: input.images?.map(i => i.imageUrl),
            categoryId: category?.id,
            category,
            inventory: input.inventory
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
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }
    }
  ),
  rest.patch(
    "http://localhost:5216/api/v1/products/:id",
    async (req, res, ctx) => {
      const updateProduct: ProductDto = await req.json();

      const { id } = req.params;
      // Check for the authorization header in the request
      const authorizationHeader = req.headers.get('Authorization');
      if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
        const foundIndex = productsData.findIndex((p) => p.id === id);
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
      else {
        const error = new Error('Unauthorized');
        return res(ctx.status(401), ctx.json(error));
      }
    }
  ),
];

const server = setupServer(...handlers);

export default server;
