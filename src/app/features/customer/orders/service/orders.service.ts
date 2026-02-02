import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderRequest } from '../model/order.model';
import { ApiResponse } from '../../customers/model/customer.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiUrl = environment.customServiceUrl + "/orders";

    constructor(private http: HttpClient) { }

    getOrders(): Observable<ApiResponse<Order[]>> {
        return this.http.get<ApiResponse<Order[]>>(this.apiUrl);
    }

    getOrder(id: string): Observable<ApiResponse<Order>> {
        return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${id}`);
    }

    createOrder(order: OrderRequest): Observable<ApiResponse<Order>> {
        return this.http.post<ApiResponse<Order>>(this.apiUrl, order);
    }

    updateOrder(id: string, order: OrderRequest): Observable<ApiResponse<Order>> {
        return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/${id}`, order);
    }

    deleteOrder(id: string): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
