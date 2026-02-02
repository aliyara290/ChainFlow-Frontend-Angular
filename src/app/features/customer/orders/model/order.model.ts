import { OrderStatus } from '../../models/enums';
import { Delivery } from '../../deliveries/model/delivery.model';

export interface OrderProduct {
    productId: string;
    quantity: number;
}

export interface OrderRequest {
    orderStatus: OrderStatus;
    customerId: string;
    products: OrderProduct[];
}

export interface Order {
    id: string;
    quantity: number;
    orderStatus: OrderStatus;
    customerId: string;
    customerName: string;
    productIds: string[];
    delivery: Delivery | null;
}
