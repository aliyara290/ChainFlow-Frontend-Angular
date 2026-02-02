import { DeliveryStatus } from '../../models/enums';
import { CustomerAddress } from '../../customers/model/customer.model';

// Minimal interfaces to avoid circular dependencies if possible, or full ones if needed.
// Based on response DTO:
export interface DeliveryVehicle {
    id: string;
    plateNumber: string;
}

export interface DeliveryDriver {
    id: string;
    firstName: string;
}

export interface DeliveryOrder {
    id: string;
    orderStatus: string;
}

export interface Delivery {
    id: string;
    status: DeliveryStatus;
    date: string;
    cost: number;
    adresse: CustomerAddress;
    vehicle: DeliveryVehicle;
    driver: DeliveryDriver;
    order: DeliveryOrder;
}

export interface DeliveryRequest {
    status: DeliveryStatus;
    date: string;
    cost: number;
    adresse: Omit<CustomerAddress, 'id'>;
    vehicleId: string;
    driverId: string;
    orderId: string;
}
