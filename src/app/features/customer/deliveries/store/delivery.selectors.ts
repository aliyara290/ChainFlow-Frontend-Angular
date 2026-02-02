import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeliveryState, selectAll, selectEntities } from './delivery.reducer';

export const selectDeliveryState = createFeatureSelector<DeliveryState>('deliveries');

export const selectAllDeliveries = createSelector(
    selectDeliveryState,
    selectAll
);

export const selectDeliveryEntities = createSelector(
    selectDeliveryState,
    selectEntities
);

export const selectDeliveryLoading = createSelector(
    selectDeliveryState,
    (state: DeliveryState) => state.loading
);

export const selectDeliveryError = createSelector(
    selectDeliveryState,
    (state: DeliveryState) => state.error
);

export const selectSelectedDeliveryId = createSelector(
    selectDeliveryState,
    (state: DeliveryState) => state.selectedDeliveryId
);

export const selectSelectedDelivery = createSelector(
    selectDeliveryEntities,
    selectSelectedDeliveryId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);
