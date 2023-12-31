import { Order, OrderProductCreateDTO, OrderProductReadDTO, OrderStatus } from "../../types/orderDto";
import { productsData } from "./productData.Seed";
import { usersData } from "./usersData.Seed";

export const orderProductData: OrderProductReadDTO[] = [
    {
        productId: productsData[0].id,
        orderId: "248293c8-dd9f-4c2b-8c2a-0fb62fa8f5e6",
        quntity: 1,
        price: 20,
        product: productsData[0]

    }];

export const orderData: Order[] = [
    {
        id: "248293c8-dd9f-4c2b-8c2a-0fb62fa8f5e6",
        status: OrderStatus.Pending,
        userId: usersData[2].id,
        user: usersData[2],
        orderProducts: orderProductData
    }];

