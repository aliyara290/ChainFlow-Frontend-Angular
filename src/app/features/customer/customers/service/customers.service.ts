import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerRequest, ApiResponse } from '../model/customer.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CustomersService {
    private apiUrl = environment.customServiceUrl + "/customers";

    constructor(private http: HttpClient) { }

    getCustomers(): Observable<ApiResponse<Customer[]>> {
        return this.http.get<ApiResponse<Customer[]>>(this.apiUrl);
    }

    getCustomer(id: string): Observable<ApiResponse<Customer>> {
        return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/${id}`);
    }

    createCustomer(customer: CustomerRequest): Observable<ApiResponse<Customer>> {
        return this.http.post<ApiResponse<Customer>>(this.apiUrl, customer);
    }

    updateCustomer(id: string, customer: CustomerRequest): Observable<ApiResponse<Customer>> {
        return this.http.put<ApiResponse<Customer>>(`${this.apiUrl}/${id}`, customer);
    }

    deleteCustomer(id: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
