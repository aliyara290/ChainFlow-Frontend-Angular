import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DeliveryActions from './delivery.actions';
import { DeliveriesService } from '../service/deliveries.service';

@Injectable()
export class DeliveryEffects {
    private actions$ = inject(Actions);
    private deliveriesService = inject(DeliveriesService);

    loadDeliveries$ = createEffect(() => this.actions$.pipe(
        ofType(DeliveryActions.loadDeliveries),
        mergeMap(() => this.deliveriesService.getDeliveries()
            .pipe(
                map(response => DeliveryActions.loadDeliveriesSuccess({ deliveries: response.data })),
                catchError(error => of(DeliveryActions.loadDeliveriesFailure({ error })))
            ))
    ));

    loadDelivery$ = createEffect(() => this.actions$.pipe(
        ofType(DeliveryActions.loadDelivery),
        mergeMap(action => this.deliveriesService.getDelivery(action.id)
            .pipe(
                map(response => DeliveryActions.loadDeliverySuccess({ delivery: response.data })),
                catchError(error => of(DeliveryActions.loadDeliveryFailure({ error })))
            ))
    ));

    createDelivery$ = createEffect(() => this.actions$.pipe(
        ofType(DeliveryActions.createDelivery),
        mergeMap(action => this.deliveriesService.createDelivery(action.delivery)
            .pipe(
                map(response => DeliveryActions.createDeliverySuccess({ delivery: response.data })),
                catchError(error => of(DeliveryActions.createDeliveryFailure({ error })))
            ))
    ));

    updateDelivery$ = createEffect(() => this.actions$.pipe(
        ofType(DeliveryActions.updateDelivery),
        mergeMap(action => this.deliveriesService.updateDelivery(action.id, action.delivery)
            .pipe(
                map(response => DeliveryActions.updateDeliverySuccess({ delivery: response.data })),
                catchError(error => of(DeliveryActions.updateDeliveryFailure({ error })))
            ))
    ));

    deleteDelivery$ = createEffect(() => this.actions$.pipe(
        ofType(DeliveryActions.deleteDelivery),
        mergeMap(action => this.deliveriesService.deleteDelivery(action.id)
            .pipe(
                map(() => DeliveryActions.deleteDeliverySuccess({ id: action.id })),
                catchError(error => of(DeliveryActions.deleteDeliveryFailure({ error })))
            ))
    ));
}
