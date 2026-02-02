import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Driver } from '../model/driver.model';
import * as DriverActions from './driver.actions';

export interface DriverState extends EntityState<Driver> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Driver> = createEntityAdapter<Driver>();

export const initialState: DriverState = adapter.getInitialState({
    loading: false,
    error: null,
});

export const driverReducer = createReducer(
    initialState,
    on(DriverActions.loadDrivers, (state) => ({ ...state, loading: true, error: null })),
    on(DriverActions.loadDriversSuccess, (state, { drivers }) => adapter.setAll(drivers, { ...state, loading: false })),
    on(DriverActions.loadDriversFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DriverActions.createDriver, (state) => ({ ...state, loading: true, error: null })),
    on(DriverActions.createDriverSuccess, (state, { driver }) => adapter.addOne(driver, { ...state, loading: false })),
    on(DriverActions.createDriverFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DriverActions.updateDriver, (state) => ({ ...state, loading: true, error: null })),
    on(DriverActions.updateDriverSuccess, (state, { driver }) => adapter.updateOne({ id: driver.id, changes: driver }, { ...state, loading: false })),
    on(DriverActions.updateDriverFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
