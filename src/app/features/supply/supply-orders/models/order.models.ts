export interface OrderMaterialRequest {
    materialId: string;
    quantity: number;
}

export interface OrderMaterialResponse {
    id: string;
    materialId: string;
    materialName: string;
    quantity: number;
    unit: string;
}

export interface OrderRequest {
    supplierId: string;
    materials: OrderMaterialRequest[];
}

export interface OrderResponse {
    id: string;
    supplierId: string;
    status: string;
    orderDate: string; // LocalDate from backend as ISO string
    orderMaterials: OrderMaterialResponse[];
}

export type Order = OrderResponse;
export type OrderMaterial = OrderMaterialResponse;
