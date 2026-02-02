export interface Driver {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseType: string;
    licenseNumber: string;
}

export interface DriverRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseType: string;
    licenseNumber: string;
}
