export interface CustomerAddress {
    id?: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    adresse: CustomerAddress;
}

export interface CustomerRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    adresse: Omit<CustomerAddress, 'id'>;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
