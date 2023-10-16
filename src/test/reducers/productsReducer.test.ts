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
import { CreateProduct } from "../../types/CreateProduct";
import { createProductAsync } from "../../redux/reducers/product/createProductAsync";
import UpdateProduct from "../../types/UpdateProduct";
import { getProductsByCategoryAsync } from "../../redux/reducers/product/getProductsByCategoryAsync";
import { getSingleProductByIdAsync } from "../../redux/reducers/product/getSingleProductByIdAsync";

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
    await store.dispatch(getProductsByCategoryAsync(2));
    const products = store.getState().productReducer.products;
    expect(products.length).toBe(3);
  });
  test("get a product by product Id", async () => {
    await store.dispatch(getSingleProductByIdAsync(1));
    const product = store.getState().productReducer.product;
    expect(product?.title).toBe("Electronic Metal Keyboard");
  });
  test("delete an existing item", async () => {
    const resultAction = await store.dispatch(deleteProductAsync(1));
    expect(resultAction.payload).toBe(1);
  });
  test("delete an item which is not exist", async () => {
    await store.dispatch(deleteProductAsync(10));

    expect(store.getState().productReducer.error).toBe(
      "Could not delete product"
    );
  });
  test("should create an Item", async () => {
    const product: CreateProduct = {
      title: "New Product",
      price: 100,
      description: "A description",
      categoryId: 2,
      images: ["https://placeimg.com/640/480/any"],
    };
    await store.dispatch(createProductAsync(product));
    expect(store.getState().productReducer.products.length).toBe(1);
  });
  test("should not create an Item with wrong category id", async () => {
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: 100,
      categoryId: 10,
      images: ["image 1"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().productReducer.products.length).toBe(0);
  });
  test("should not create an Item with negative price value", async () => {
    const input: CreateProduct = {
      title: "test product",
      description: "test product",
      price: -100,
      categoryId: 2,
      images: ["image 1"],
    };
    await store.dispatch(createProductAsync(input));
    expect(store.getState().productReducer.products.length).toBe(0);
  });
  test("Should update an Item", async () => {
    const input: UpdateProduct = {
      id: 1,
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
      id: 1,
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
