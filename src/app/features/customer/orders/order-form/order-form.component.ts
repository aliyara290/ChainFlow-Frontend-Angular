import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Order, OrderRequest, OrderProduct } from '../model/order.model';
import { OrderStatus } from '../../models/enums';

@Component({
    selector: 'app-order-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
    templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
    @Input() order: Order | null = null;
    @Output() save = new EventEmitter<OrderRequest>();
    @Output() cancel = new EventEmitter<void>();

    statuses = Object.values(OrderStatus);

    model: OrderRequest = {
        orderStatus: OrderStatus.PENDING,
        customerId: '',
        products: []
    };

    ngOnInit() {
        if (this.order) {
            this.model = {
                orderStatus: this.order.orderStatus,
                customerId: this.order.customerId,
                products: []
            };
        } else {
            this.addProduct();
        }
    }

    addProduct() {
        this.model.products.push({ productId: '', quantity: 1 });
    }

    removeProduct(index: number) {
        this.model.products.splice(index, 1);
    }

    onSave() {
        this.save.emit(this.model);
    }

    onCancel() {
        this.cancel.emit();
    }
}
