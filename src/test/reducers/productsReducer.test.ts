import { PayloadAction } from "@reduxjs/toolkit";
import productReducer, {
  getAllProductsAsync,
  sortByPrice,
  updateProductAsync,
} from "../../redux/reducers/product/productReducer";
import { createStore } from "../../redux/store";
import Product from "../../types/Product";
import { productsData } from "../dataSeed/productData.Seed";
import server from "../shared/server";
import { deleteProductAsync } from "../../redux/reducers/product/deleteProductAsync";
import { CreateProduct, CreateProductWithAccessToken } from "../../types/CreateProduct";
import { createProductAsync } from "../../redux/reducers/product/createProductAsync";
import UpdateProduct from "../../types/UpdateProduct";
import { getProductsByCategoryAsync } from "../../redux/reducers/product/getProductsByCategoryAsync";
import { getSingleProductByIdAsync } from "../../redux/reducers/product/getSingleProductByIdAsync";
import { CreateProductImage } from "../../types/CreateProductImage";

let store = createStore();

beforeEach(() => {
  store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const state: {
  products: Product[];
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
  error: undefined,
};
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmMWVkN2MwNi04NGRiLTRmY2EtYjI5OS0wYWQ3YWE4ZWQ2NDMiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDM0OTY5MzMsImV4cCI6MTcwMzY2OTczMywiaWF0IjoxNzAzNDk2OTMzLCJpc3MiOiJBYmhpc2hlayIsImF1ZCI6IkFiaGlzaGVrRUNvbW1lcmNlIn0.LRRatYF8RIZ6O5fswGM3DIbtOOeZiX6-ZVO4o0V5IEk';
beforeEach(() => {
  state.products = productsData;
  (state.loading = false), (state.error = undefined);
});

describe("Test actions in productReducer", () => {
  test("should sort products by price in desending order", () => {
    const products = productReducer(state, sortByPrice("desc")).products;
    expect(products[0]).toBe(productsData[4]);
    expect(products[4]).toBe(productsData[0]);
  });

  test("should sort products by price in ascending order", () => {
    const products = productReducer(state, sortByPrice("asc")).products;
    expect(products[0]).toBe(productsData[0]);
    expect(products[4]).toBe(productsData[4]);
  });
});

describe("Test Async Thunk actions in product reducer ", () => {
  test("get all products from Fake Store API", async () => {
    await store.dispatch(getAllProductsAsync());
    const products = store.getState().productReducer.products;
    expect(products.length).toBe(5);
  });
  test("get all products by category", async () => {
    await store.dispatch(getProductsByCategoryAsync("08b76f82-87bf-4bea-9de7-d2725dfb05cf"));
    const products = store.getState().productReducer.products;
    expect(products.length).toBe(3);
  });
  test("get a product by product Id", async () => {
    await store.dispatch(getSingleProductByIdAsync("0678f309-9add-4ca1-8b8b-6462f61cf8b3"));
    const product = store.getState().productReducer.product;
    expect(product?.title).toBe("Electronic Metal Keyboard");
  });
  test("delete an existing item", async () => {
    const resultAction = await store.dispatch(deleteProductAsync("0678f309-9add-4ca1-8b8b-6462f61cf8b3"));
    expect(resultAction.payload).toBe(1);
  });
  test("delete an item which is not exist", async () => {
    await store.dispatch(deleteProductAsync("0678f309-9add-4ca1-8b8b-6462f61cf8b4"));

    expect(store.getState().productReducer.error).toBe(
      "Could not delete product"
    );
  });
  test("should create an Item", async () => {
    const createProductImage: CreateProductImage = {
      imageUrl: "image 1"
    };
    const product: CreateProduct = {
      title: "New Product",
      price: 100,
      description: "A description",
      categoryId: "4289efbf-5e58-43de-9294-c633d7f89e37",
      inventory: 10,
      images: [createProductImage],
    };
    const product_accessToken: CreateProductWithAccessToken = {
      createProduct: product,
      access_token: access_token
    };
    await store.dispatch(createProductAsync(product_accessToken));
    expect(store.getState().productReducer.products.length).toBe(1);
  });
  test("should not create an Item with wrong category id", async () => {
    const createProductImage: CreateProductImage = {
      imageUrl: "image 1"
    };
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: "08b76f82-87bf-4bea-9de7-d2725dfb05cf",
      inventory: 10,
      images: [createProductImage],
    };
    const product_accessToken: CreateProductWithAccessToken = {
      createProduct: input,
      access_token: access_token
    };
    await store.dispatch(createProductAsync(product_accessToken));
    expect(store.getState().productReducer.products.length).toBe(0);
  });
  test("should not create an Item with negative price value", async () => {
    const createProductImage: CreateProductImage = {
      imageUrl: "image 1"
    };
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: -100,
      categoryId: "4289efbf-5e58-43de-9294-c633d7f89e37",
      inventory: 20,
      images: [createProductImage],
    };
    const product_accessToken: CreateProductWithAccessToken = {
      createProduct: input,
      access_token: access_token
    };
    await store.dispatch(createProductAsync(product_accessToken));
    expect(store.getState().productReducer.products.length).toBe(0);
  });
  test("Should update an Item", async () => {
    const input: UpdateProduct = {
      id: "086bdb0f-1087-45ad-a5e8-2d9b767dac44",
      updateProduct: {
        price: 200,
        title: "Newly updated product",
      },
    };
    const action = await store.dispatch(updateProductAsync(input));
    expect(action.payload).toMatchObject({
      id: 1,
      title: "Newly updated product",
      price: 200,
      category: {
        id: 2,
        name: "Electronics",
        image: "https://i.imgur.com/RQL19O6.jpeg",
      },
      images: [
        "https://i.imgur.com/wUBxCQh.jpeg",
        "https://i.imgur.com/9aM8pz3.jpeg",
        "https://i.imgur.com/ZDMM36B.jpeg",
      ],
      description:
        "The beautiful range of Apple Natural\u00E9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    });
    // expect(store.getState().products)
  });
  test("Should not update an Item for negative price value", async () => {
    const input: UpdateProduct = {
      id: "0678f309-9add-4ca1-8b8b-6462f61cf8b3",
      updateProduct: {
        price: -200,
        title: "Newly updated product",
      },
    };
    const action = await store.dispatch(updateProductAsync(input));

    expect(action.payload).toMatchObject({
      message: [
        "price must be a positive number",
        "images must contain at least 1 elements",
        "each value in images must be a URL address",
        "images must be an array",
      ],
      error: "Bad Request",
      statusCode: 400,
    });
  });
});
