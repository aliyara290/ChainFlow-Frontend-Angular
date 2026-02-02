export interface MaterialRequest {
    name: string;
    stock: number;
    stockMin: number;
    unit: string;
    supplierId: string;
}

export interface MaterialResponse {
    id: string;
    name: string;
    stock: number;
    stockMin: number;
    unit: string;
    supplierId: string;
}

export type Material = MaterialResponse;
