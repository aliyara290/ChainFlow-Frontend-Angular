import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from '../model/customer.model';
import * as CustomerActions from './customer.actions';

export interface CustomerState extends EntityState<Customer> {
    selectedCustomerId: string | null;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: CustomerState = adapter.getInitialState({
    selectedCustomerId: null,
    loading: false,
    error: null,
});

export const customerReducer = createReducer(
    initialState,
    on(CustomerActions.loadCustomers, (state) => ({ ...state, loading: true, error: null })),
    on(CustomerActions.loadCustomersSuccess, (state, { customers }) => adapter.setAll(customers, { ...state, loading: false })),
    on(CustomerActions.loadCustomersFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CustomerActions.loadCustomer, (state) => ({ ...state, loading: true, error: null })),
    on(CustomerActions.loadCustomerSuccess, (state, { customer }) => adapter.upsertOne(customer, { ...state, loading: false, selectedCustomerId: customer.id })),
    on(CustomerActions.loadCustomerFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CustomerActions.createCustomer, (state) => ({ ...state, loading: true, error: null })),
    on(CustomerActions.createCustomerSuccess, (state, { customer }) => adapter.addOne(customer, { ...state, loading: false })),
    on(CustomerActions.createCustomerFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CustomerActions.updateCustomer, (state) => ({ ...state, loading: true, error: null })),
    on(CustomerActions.updateCustomerSuccess, (state, { customer }) => adapter.updateOne({ id: customer.id, changes: customer }, { ...state, loading: false })),
    on(CustomerActions.updateCustomerFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CustomerActions.deleteCustomer, (state) => ({ ...state, loading: true, error: null })),
    on(CustomerActions.deleteCustomerSuccess, (state, { id }) => adapter.removeOne(id, { ...state, loading: false })),
    on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
