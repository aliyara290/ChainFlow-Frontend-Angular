import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DriverState, selectAll, selectEntities } from './driver.reducer';

export const selectDriverState = createFeatureSelector<DriverState>('drivers');

export const selectAllDrivers = createSelector(
    selectDriverState,
    selectAll
);

export const selectDriverEntities = createSelector(
    selectDriverState,
    selectEntities
);

export const selectDriverLoading = createSelector(
    selectDriverState,
    (state: DriverState) => state.loading
);

export const selectDriverError = createSelector(
    selectDriverState,
    (state: DriverState) => state.error
);
