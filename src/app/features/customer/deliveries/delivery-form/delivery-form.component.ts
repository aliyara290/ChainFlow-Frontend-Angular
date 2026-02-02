import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Delivery, DeliveryRequest } from '../model/delivery.model';
import { DeliveryStatus } from '../../models/enums';

@Component({
    selector: 'app-delivery-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
    templateUrl: './delivery-form.component.html'
})
export class DeliveryFormComponent implements OnInit {
    @Input() delivery: Delivery | null = null;
    @Output() save = new EventEmitter<DeliveryRequest>();
    @Output() cancel = new EventEmitter<void>();

    statuses = Object.values(DeliveryStatus);

    model: DeliveryRequest = {
        status: DeliveryStatus.PENDING,
        date: '',
        cost: 0,
        adresse: {
            street: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        vehicleId: '',
        driverId: '',
        orderId: ''
    };

    ngOnInit() {
        if (this.delivery) {
            this.model = {
                status: this.delivery.status,
                date: this.delivery.date,
                cost: this.delivery.cost,
                adresse: { ...this.delivery.adresse },
                vehicleId: this.delivery.vehicle?.id || '',
                driverId: this.delivery.driver?.id || '',
                orderId: this.delivery.order?.id || ''
            };
        }
    }

    onSave() {
        this.save.emit(this.model);
    }

    onCancel() {
        this.cancel.emit();
    }
}
