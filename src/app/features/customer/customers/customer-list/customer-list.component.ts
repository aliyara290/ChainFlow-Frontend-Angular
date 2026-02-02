import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Customer } from '../model/customer.model';
import * as CustomerActions from '../store/customer.actions';
import * as CustomerSelectors from '../store/customer.selectors';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
    selector: 'app-customer-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, CustomerFormComponent],
    templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
    customers$: Observable<Customer[]>;
    loading$: Observable<boolean>;
    customerDialog: boolean = false;
    selectedCustomer: Customer | null = null;

    constructor(private store: Store) {
        this.customers$ = this.store.select(CustomerSelectors.selectAllCustomers);
        this.loading$ = this.store.select(CustomerSelectors.selectCustomerLoading);
    }

    ngOnInit() {
        this.store.dispatch(CustomerActions.loadCustomers());
    }

    openNew() {
        this.selectedCustomer = null;
        this.customerDialog = true;
    }

    editCustomer(customer: Customer) {
        this.selectedCustomer = { ...customer };
        this.customerDialog = true;
    }

    deleteCustomer(customer: Customer) {
        if (confirm('Are you sure you want to delete ' + customer.firstName + '?')) {
            this.store.dispatch(CustomerActions.deleteCustomer({ id: customer.id }));
        }
    }

    hideDialog() {
        this.customerDialog = false;
        this.selectedCustomer = null;
    }

    onSave(customerData: any) {
        if (this.selectedCustomer && this.selectedCustomer.id) {
            this.store.dispatch(CustomerActions.updateCustomer({ id: this.selectedCustomer.id, customer: customerData }));
        } else {
            this.store.dispatch(CustomerActions.createCustomer({ customer: customerData }));
        }
        this.customerDialog = false;
    }
}
