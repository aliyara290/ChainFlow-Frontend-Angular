import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Delivery, DeliveryRequest } from '../model/delivery.model';
import { ApiResponse } from '../../customers/model/customer.model';
import {environment} from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DeliveriesService {
    private apiUrl = environment.customServiceUrl + "/deliveries";

    constructor(private http: HttpClient) { }

    getDeliveries(): Observable<ApiResponse<Delivery[]>> {
        return this.http.get<ApiResponse<Delivery[]>>(this.apiUrl);
    }

    getDelivery(id: string): Observable<ApiResponse<Delivery>> {
        return this.http.get<ApiResponse<Delivery>>(`${this.apiUrl}/${id}`);
    }

    createDelivery(delivery: DeliveryRequest): Observable<ApiResponse<Delivery>> {
        return this.http.post<ApiResponse<Delivery>>(this.apiUrl, delivery);
    }

    updateDelivery(id: string, delivery: DeliveryRequest): Observable<ApiResponse<Delivery>> {
        return this.http.put<ApiResponse<Delivery>>(`${this.apiUrl}/${id}`, delivery);
    }

    deleteDelivery(id: string): Observable<ApiResponse<void>> {
        // Note: Delete API was not explicitly mentioned for Deliveries in the prompt, but adding generic support.
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
