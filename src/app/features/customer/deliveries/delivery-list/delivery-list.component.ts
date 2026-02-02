import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Delivery } from '../model/delivery.model';
import * as DeliveryActions from '../store/delivery.actions';
import * as DeliverySelectors from '../store/delivery.selectors';
import { DeliveryFormComponent } from '../delivery-form/delivery-form.component';

@Component({
    selector: 'app-delivery-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, DeliveryFormComponent],
    templateUrl: './delivery-list.component.html'
})
export class DeliveryListComponent implements OnInit {
    deliveries$: Observable<Delivery[]>;
    loading$: Observable<boolean>;
    deliveryDialog: boolean = false;
    selectedDelivery: Delivery | null = null;

    constructor(private store: Store) {
        this.deliveries$ = this.store.select(DeliverySelectors.selectAllDeliveries);
        this.loading$ = this.store.select(DeliverySelectors.selectDeliveryLoading);
    }

    ngOnInit() {
        this.store.dispatch(DeliveryActions.loadDeliveries());
    }

    openNew() {
        this.selectedDelivery = null;
        this.deliveryDialog = true;
    }

    editDelivery(delivery: Delivery) {
        this.selectedDelivery = { ...delivery };
        this.deliveryDialog = true;
    }

    deleteDelivery(delivery: Delivery) {
        if (confirm('Are you sure you want to delete delivery ' + delivery.id + '?')) {
            this.store.dispatch(DeliveryActions.deleteDelivery({ id: delivery.id }));
        }
    }

    hideDialog() {
        this.deliveryDialog = false;
        this.selectedDelivery = null;
    }

    onSave(deliveryData: any) {
        if (this.selectedDelivery && this.selectedDelivery.id) {
            this.store.dispatch(DeliveryActions.updateDelivery({ id: this.selectedDelivery.id, delivery: deliveryData }));
        } else {
            this.store.dispatch(DeliveryActions.createDelivery({ delivery: deliveryData }));
        }
        this.deliveryDialog = false;
    }
}
