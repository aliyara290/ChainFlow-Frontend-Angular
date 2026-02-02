import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as OrderActions from './order.actions';
import { OrdersService } from '../service/orders.service';

@Injectable()
export class OrderEffects {
    private actions$ = inject(Actions);
    private ordersService = inject(OrdersService);

    loadOrders$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.loadOrders),
        mergeMap(() => this.ordersService.getOrders()
            .pipe(
                map(response => OrderActions.loadOrdersSuccess({ orders: response.data })),
                catchError(error => of(OrderActions.loadOrdersFailure({ error })))
            ))
    ));

    loadOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.loadOrder),
        mergeMap(action => this.ordersService.getOrder(action.id)
            .pipe(
                map(response => OrderActions.loadOrderSuccess({ order: response.data })),
                catchError(error => of(OrderActions.loadOrderFailure({ error })))
            ))
    ));

    createOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.createOrder),
        mergeMap(action => this.ordersService.createOrder(action.order)
            .pipe(
                map(response => OrderActions.createOrderSuccess({ order: response.data })),
                catchError(error => of(OrderActions.createOrderFailure({ error })))
            ))
    ));

    updateOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.updateOrder),
        mergeMap(action => this.ordersService.updateOrder(action.id, action.order)
            .pipe(
                map(response => OrderActions.updateOrderSuccess({ order: response.data })),
                catchError(error => of(OrderActions.updateOrderFailure({ error })))
            ))
    ));

    deleteOrder$ = createEffect(() => this.actions$.pipe(
        ofType(OrderActions.deleteOrder),
        mergeMap(action => this.ordersService.deleteOrder(action.id)
            .pipe(
                map(() => OrderActions.deleteOrderSuccess({ id: action.id })),
                catchError(error => of(OrderActions.deleteOrderFailure({ error })))
            ))
    ));
}
