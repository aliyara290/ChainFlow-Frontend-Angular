import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState, selectAll, selectEntities } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const selectAllOrders = createSelector(
    selectOrderState,
    selectAll
);

export const selectOrderEntities = createSelector(
    selectOrderState,
    selectEntities
);

export const selectOrderLoading = createSelector(
    selectOrderState,
    (state: OrderState) => state.loading
);

export const selectOrderError = createSelector(
    selectOrderState,
    (state: OrderState) => state.error
);

export const selectSelectedOrderId = createSelector(
    selectOrderState,
    (state: OrderState) => state.selectedOrderId
);

export const selectSelectedOrder = createSelector(
    selectOrderEntities,
    selectSelectedOrderId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);
