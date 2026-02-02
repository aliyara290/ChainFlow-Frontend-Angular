import { createAction, props } from '@ngrx/store';
import { Customer, CustomerRequest } from '../model/customer.model';

export const loadCustomers = createAction('[Customer] Load Customers');
export const loadCustomersSuccess = createAction('[Customer] Load Customers Success', props<{ customers: Customer[] }>());
export const loadCustomersFailure = createAction('[Customer] Load Customers Failure', props<{ error: any }>());

export const loadCustomer = createAction('[Customer] Load Customer', props<{ id: string }>());
export const loadCustomerSuccess = createAction('[Customer] Load Customer Success', props<{ customer: Customer }>());
export const loadCustomerFailure = createAction('[Customer] Load Customer Failure', props<{ error: any }>());

export const createCustomer = createAction('[Customer] Create Customer', props<{ customer: CustomerRequest }>());
export const createCustomerSuccess = createAction('[Customer] Create Customer Success', props<{ customer: Customer }>());
export const createCustomerFailure = createAction('[Customer] Create Customer Failure', props<{ error: any }>());

export const updateCustomer = createAction('[Customer] Update Customer', props<{ id: string; customer: CustomerRequest }>());
export const updateCustomerSuccess = createAction('[Customer] Update Customer Success', props<{ customer: Customer }>());
export const updateCustomerFailure = createAction('[Customer] Update Customer Failure', props<{ error: any }>());

export const deleteCustomer = createAction('[Customer] Delete Customer', props<{ id: string }>());
export const deleteCustomerSuccess = createAction('[Customer] Delete Customer Success', props<{ id: string }>());
export const deleteCustomerFailure = createAction('[Customer] Delete Customer Failure', props<{ error: any }>());
