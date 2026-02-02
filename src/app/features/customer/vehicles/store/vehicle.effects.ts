import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as VehicleActions from './vehicle.actions';
import { VehiclesService } from '../service/vehicles.service';

@Injectable()
export class VehicleEffects {
    private actions$ = inject(Actions);
    private vehiclesService = inject(VehiclesService);

    loadVehicles$ = createEffect(() => this.actions$.pipe(
        ofType(VehicleActions.loadVehicles),
        mergeMap(() => this.vehiclesService.getVehicles()
            .pipe(
                map(vehicles => VehicleActions.loadVehiclesSuccess({ vehicles })),
                catchError(error => of(VehicleActions.loadVehiclesFailure({ error })))
            ))
    ));

    createVehicle$ = createEffect(() => this.actions$.pipe(
        ofType(VehicleActions.createVehicle),
        mergeMap(action => this.vehiclesService.createVehicle(action.vehicle)
            .pipe(
                map(vehicle => VehicleActions.createVehicleSuccess({ vehicle })),
                catchError(error => of(VehicleActions.createVehicleFailure({ error })))
            ))
    ));

    updateVehicle$ = createEffect(() => this.actions$.pipe(
        ofType(VehicleActions.updateVehicle),
        mergeMap(action => this.vehiclesService.updateVehicle(action.id, action.vehicle)
            .pipe(
                map(vehicle => VehicleActions.updateVehicleSuccess({ vehicle })),
                catchError(error => of(VehicleActions.updateVehicleFailure({ error })))
            ))
    ));
}
