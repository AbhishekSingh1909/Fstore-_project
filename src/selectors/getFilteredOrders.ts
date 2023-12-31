import { Order } from "../types/orderDto";

const getFilteredOrders = (products: Order[], search?: string) => {
    return products.filter((o) =>
        o.id.toLowerCase().includes(search?.toLowerCase() || "") || o.status.toString().toLowerCase().includes(search?.toLowerCase() || "")
        || o.user?.name.toLowerCase().includes(search?.toLowerCase() || "")
    );
};

export default getFilteredOrders;