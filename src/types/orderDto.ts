import Product from "./Product";
import { User } from "./User";

export interface OrderProductCreateDTO {
    productId: string,
    quntity: number;
}

export interface OrderProductReadDTO {
    productId: string,
    orderId: string,
    quntity: number,
    price: number
    product: Product
}

export interface Order {
    id: string,
    userId: string,
    user: User,
    orderStatus: OrderStatus
    orderProducts: OrderProductReadDTO[]
}

export interface CreateOrder {
    orderProducts: OrderProductCreateDTO[]
}

export interface UpdateOrder {
    status: string
}

export enum OrderStatus {
    "Pending",
    "Processing",
    "Cancelled",
    "Shipped",
    "Delivered"
}