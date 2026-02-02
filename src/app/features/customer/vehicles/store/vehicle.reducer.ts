import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Vehicle } from '../model/vehicle.model';
import * as VehicleActions from './vehicle.actions';

export interface VehicleState extends EntityState<Vehicle> {
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>();

export const initialState: VehicleState = adapter.getInitialState({
    loading: false,
    error: null,
});

export const vehicleReducer = createReducer(
    initialState,
    on(VehicleActions.loadVehicles, (state) => ({ ...state, loading: true, error: null })),
    on(VehicleActions.loadVehiclesSuccess, (state, { vehicles }) => adapter.setAll(vehicles, { ...state, loading: false })),
    on(VehicleActions.loadVehiclesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VehicleActions.createVehicle, (state) => ({ ...state, loading: true, error: null })),
    on(VehicleActions.createVehicleSuccess, (state, { vehicle }) => adapter.addOne(vehicle, { ...state, loading: false })),
    on(VehicleActions.createVehicleFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VehicleActions.updateVehicle, (state) => ({ ...state, loading: true, error: null })),
    on(VehicleActions.updateVehicleSuccess, (state, { vehicle }) => adapter.updateOne({ id: vehicle.id, changes: vehicle }, { ...state, loading: false })),
    on(VehicleActions.updateVehicleFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
