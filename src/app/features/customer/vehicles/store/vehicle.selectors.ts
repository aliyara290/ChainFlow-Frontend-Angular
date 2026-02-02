import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState, selectAll, selectEntities } from './vehicle.reducer';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicles');

export const selectAllVehicles = createSelector(
    selectVehicleState,
    selectAll
);

export const selectVehicleEntities = createSelector(
    selectVehicleState,
    selectEntities
);

export const selectVehicleLoading = createSelector(
    selectVehicleState,
    (state: VehicleState) => state.loading
);

export const selectVehicleError = createSelector(
    selectVehicleState,
    (state: VehicleState) => state.error
);
