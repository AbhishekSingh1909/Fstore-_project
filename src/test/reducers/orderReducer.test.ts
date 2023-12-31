import { createOrderAsync } from "../../redux/reducers/order/createOrderAsync";
import { getAllOrdersAsync } from "../../redux/reducers/order/getAllOrdersAsync";
import { createStore } from "../../redux/store";
import { CreateOrder, OrderProductCreateDTO } from "../../types/orderDto";
import { productsData } from "../dataSeed/productData.Seed";
import orderServer from "../shared/orderServer";

let store = createStore();

beforeEach(() => {
    store = createStore();
});

// Enable API mocking before tests.
beforeAll(() => orderServer.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => orderServer.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => orderServer.close());

describe("Test order reducer async actions", () => {
    test("get all order", async () => {
        await store.dispatch(getAllOrdersAsync());
        expect(store.getState().orderReducer.orders.length).toBe(1);
    });

    test("create an order", async () => {
        const orderProductCreateData: OrderProductCreateDTO[] = [{
            productId: productsData[0].id,
            quntity: 2
        }];
        const createOder: CreateOrder =
        {
            orderProducts: orderProductCreateData
        }
        await store.dispatch(createOrderAsync(createOder));
        expect(store.getState().orderReducer.orders.length).toBe(1);
        expect(store.getState().orderReducer.order?.id).toBe("248293c8-dd9f-4c2b-8c2a-0fb62fa8f5e6");
    })
});