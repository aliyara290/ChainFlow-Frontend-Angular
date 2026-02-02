import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CustomerActions from './customer.actions';
import { CustomersService } from '../service/customers.service';

@Injectable()
export class CustomerEffects {
    private actions$ = inject(Actions);
    private customersService = inject(CustomersService);

    loadCustomers$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.loadCustomers),
        mergeMap(() => this.customersService.getCustomers()
            .pipe(
                map(response => CustomerActions.loadCustomersSuccess({ customers: response.data })),
                catchError(error => of(CustomerActions.loadCustomersFailure({ error })))
            ))
    ));

    loadCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.loadCustomer),
        mergeMap(action => this.customersService.getCustomer(action.id)
            .pipe(
                map(response => CustomerActions.loadCustomerSuccess({ customer: response.data })),
                catchError(error => of(CustomerActions.loadCustomerFailure({ error })))
            ))
    ));

    createCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.createCustomer),
        mergeMap(action => this.customersService.createCustomer(action.customer)
            .pipe(
                map(response => CustomerActions.createCustomerSuccess({ customer: response.data })),
                catchError(error => of(CustomerActions.createCustomerFailure({ error })))
            ))
    ));

    updateCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.updateCustomer),
        mergeMap(action => this.customersService.updateCustomer(action.id, action.customer)
            .pipe(
                map(response => CustomerActions.updateCustomerSuccess({ customer: response.data })),
                catchError(error => of(CustomerActions.updateCustomerFailure({ error })))
            ))
    ));

    deleteCustomer$ = createEffect(() => this.actions$.pipe(
        ofType(CustomerActions.deleteCustomer),
        mergeMap(action => this.customersService.deleteCustomer(action.id)
            .pipe(
                map(() => CustomerActions.deleteCustomerSuccess({ id: action.id })),
                catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
            ))
    ));
}
