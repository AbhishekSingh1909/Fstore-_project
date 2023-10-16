import { getProductCategoriesAsync } from "../../redux/reducers/category/getProductCategoriesAsync";
import { createStore } from "../../redux/store";
import server from "../shared/server";

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

describe("Test async actions in Category Reducer", () => {
  test("get all categories", async () => {
    await store.dispatch(getProductCategoriesAsync());
    expect(store.getState().ProductCategoryReducer.categories.length).toBe(3);
  });
});
