import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState, selectAll, selectEntities } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectAllCustomers = createSelector(
    selectCustomerState,
    selectAll
);

export const selectCustomerEntities = createSelector(
    selectCustomerState,
    selectEntities
);

export const selectCustomerLoading = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.loading
);

export const selectCustomerError = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.error
);

export const selectSelectedCustomerId = createSelector(
    selectCustomerState,
    (state: CustomerState) => state.selectedCustomerId
);

export const selectSelectedCustomer = createSelector(
    selectCustomerEntities,
    selectSelectedCustomerId,
    (entities, selectedId) => selectedId ? entities[selectedId] : null
);
