import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, shareReplay, finalize, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Order, OrderRequest, OrderResponse } from '../models/order.models';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiURL: string = environment.supplierServiceUrl;

    // State management with RxJS
    private ordersSubject = new BehaviorSubject<Order[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    // Public observables
    public orders$ = this.ordersSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) { }

    /**
     * Get all orders
     */
    getOrders(): Observable<Order[]> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<OrderResponse[]>(`${this.apiURL}/orders`).pipe(
            tap(orders => this.ordersSubject.next(orders)),
            catchError(error => this.handleError('Failed to load orders', error)),
            finalize(() => this.loadingSubject.next(false)),
            shareReplay(1)
        );
    }

    /**
     * Get order by ID
     */
    getOrderById(id: string): Observable<Order> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<OrderResponse>(`${this.apiURL}/orders/${id}`).pipe(
            catchError(error => this.handleError('Failed to load order', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Create new order
     */
    createOrder(order: OrderRequest): Observable<Order> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.post<OrderResponse>(`${this.apiURL}/orders`, order).pipe(
            tap(newOrder => {
                const currentOrders = this.ordersSubject.value;
                this.ordersSubject.next([...currentOrders, newOrder]);
            }),
            catchError(error => this.handleError('Failed to create order', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Update existing order
     */
    updateOrder(id: string, order: OrderRequest): Observable<Order> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.put<OrderResponse>(`${this.apiURL}/orders/${id}`, order).pipe(
            tap(updatedOrder => {
                const currentOrders = this.ordersSubject.value;
                const index = currentOrders.findIndex(o => o.id === id);
                if (index !== -1) {
                    currentOrders[index] = updatedOrder;
                    this.ordersSubject.next([...currentOrders]);
                }
            }),
            catchError(error => this.handleError('Failed to update order', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Delete order
     */
    deleteOrder(id: string): Observable<void> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.delete<void>(`${this.apiURL}/orders/${id}`).pipe(
            tap(() => {
                const currentOrders = this.ordersSubject.value;
                this.ordersSubject.next(currentOrders.filter(o => o.id !== id));
            }),
            catchError(error => this.handleError('Failed to delete order', error)),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Get orders by supplier
     */
    getOrdersBySupplier(supplierId: string): Observable<Order[]> {
        return this.orders$.pipe(
            map(orders => orders.filter(o => o.supplierId === supplierId))
        );
    }

    /**
     * Get orders by status
     */
    getOrdersByStatus(status: string): Observable<Order[]> {
        return this.orders$.pipe(
            map(orders => orders.filter(o => o.status === status))
        );
    }

    /**
     * Error handler
     */
    private handleError(message: string, error: any): Observable<never> {
        console.error(message, error);
        const errorMessage = error.error?.message || error.message || message;
        this.errorSubject.next(errorMessage);
        return throwError(() => new Error(errorMessage));
    }

    /**
     * Clear error
     */
    clearError(): void {
        this.errorSubject.next(null);
    }
}
