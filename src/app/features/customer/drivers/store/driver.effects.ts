import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as DriverActions from './driver.actions';
import { DriversService } from '../service/drivers.service';

@Injectable()
export class DriverEffects {
    private actions$ = inject(Actions);
    private driversService = inject(DriversService);

    loadDrivers$ = createEffect(() => this.actions$.pipe(
        ofType(DriverActions.loadDrivers),
        mergeMap(() => this.driversService.getDrivers()
            .pipe(
                map(drivers => DriverActions.loadDriversSuccess({ drivers })),
                catchError(error => of(DriverActions.loadDriversFailure({ error })))
            ))
    ));

    createDriver$ = createEffect(() => this.actions$.pipe(
        ofType(DriverActions.createDriver),
        mergeMap(action => this.driversService.createDriver(action.driver)
            .pipe(
                map(driver => DriverActions.createDriverSuccess({ driver })),
                catchError(error => of(DriverActions.createDriverFailure({ error })))
            ))
    ));

    updateDriver$ = createEffect(() => this.actions$.pipe(
        ofType(DriverActions.updateDriver),
        mergeMap(action => this.driversService.updateDriver(action.id, action.driver)
            .pipe(
                map(driver => DriverActions.updateDriverSuccess({ driver })),
                catchError(error => of(DriverActions.updateDriverFailure({ error })))
            ))
    ));
}
