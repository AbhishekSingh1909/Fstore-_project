import { rest } from "msw";
import { setupServer } from "msw/lib/node";

import { usersData } from "../dataSeed/usersData.Seed";
import { orderData } from "../dataSeed/orderData.Seed";
import { CreateOrder, Order, OrderProductCreateDTO, OrderProductReadDTO, OrderStatus } from "../../types/orderDto";
import { productsData } from "../dataSeed/productData.Seed";

export const handlers = [
    rest.get("https://fakestore.azurewebsites.net/api/v1/orders", (req, res, ctx) => {

        // Check for the authorization header in the request
        const authorizationHeader = req.headers.get('Authorization');

        if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
            return res(ctx.json(orderData));
        }
        else {
            console.log("error Unauthorized")
            const error = new Error('Unauthorized');
            return res(ctx.status(401), ctx.json(error));
        }
    }),

    rest.post("https://fakestore.azurewebsites.net/api/v1/orders", async (req, res, ctx) => {
        const input: CreateOrder = await req.json();
        const authorizationHeader = req.headers.get('Authorization');
        if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
            const ordersProducts = input.orderProducts?.map((o) => {
                const ordersProducts: OrderProductReadDTO = {
                    productId: o.productId,
                    quntity: o.quntity,
                    price: productsData[1].price,
                    product: productsData[1],
                    orderId: "248293c8-dd9f-4c2b-8c2a-0fb62fa8f5e6"
                };
                return ordersProducts;
            })
            const order: Order =
            {
                id: "248293c8-dd9f-4c2b-8c2a-0fb62fa8f5e6",
                status: OrderStatus.Pending,
                userId: '08276e93-2134-4f8e-9960-43b2a84ea101',
                user: usersData[1],
                orderProducts: ordersProducts
            }
            orderData.push(order);
            return res(ctx.json(order));
        }
        else {
            console.log("error Unauthorized")
            const error = new Error('Unauthorized');
            return res(ctx.status(401), ctx.json(error));
        }
    }),
];

const orderServer = setupServer(...handlers);

export default orderServer;
