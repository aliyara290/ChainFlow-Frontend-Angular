import { VehicleStatus } from '../../models/enums';

export interface Vehicle {
    id: string;
    plateNumber: string;
    model: string;
    color: string;
    brand: string;
    capacity: number;
    status: VehicleStatus;
    modelYear: number;
}

export interface VehicleRequest {
    plateNumber: string;
    model: string;
    color: string;
    brand: string;
    capacity: number;
    status: VehicleStatus;
    modelYear: number;
}
