import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Order } from '../model/order.model';
import * as OrderActions from '../store/order.actions';
import * as OrderSelectors from '../store/order.selectors';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
    selector: 'app-order-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, OrderFormComponent],
    templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
    orders$: Observable<Order[]>;
    loading$: Observable<boolean>;
    orderDialog: boolean = false;
    selectedOrder: Order | null = null;

    constructor(private store: Store) {
        this.orders$ = this.store.select(OrderSelectors.selectAllOrders);
        this.loading$ = this.store.select(OrderSelectors.selectOrderLoading);
    }

    ngOnInit() {
        this.store.dispatch(OrderActions.loadOrders());
    }

    openNew() {
        this.selectedOrder = null;
        this.orderDialog = true;
    }

    editOrder(order: Order) {
        this.selectedOrder = { ...order };
        this.orderDialog = true;
    }

    deleteOrder(order: Order) {
        if (confirm('Are you sure you want to delete order ' + order.id + '?')) {
            this.store.dispatch(OrderActions.deleteOrder({ id: order.id }));
        }
    }

    hideDialog() {
        this.orderDialog = false;
        this.selectedOrder = null;
    }

    onSave(orderData: any) {
        if (this.selectedOrder && this.selectedOrder.id) {
            this.store.dispatch(OrderActions.updateOrder({ id: this.selectedOrder.id, order: orderData }));
        } else {
            this.store.dispatch(OrderActions.createOrder({ order: orderData }));
        }
        this.orderDialog = false;
    }
}
