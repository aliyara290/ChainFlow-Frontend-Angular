import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Vehicle, VehicleRequest } from '../model/vehicle.model';
import { VehicleStatus } from '../../models/enums';

@Component({
    selector: 'app-vehicle-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule],
    templateUrl: './vehicle-form.component.html'
})
export class VehicleFormComponent implements OnInit {
    @Input() vehicle: Vehicle | null = null;
    @Output() save = new EventEmitter<VehicleRequest>();
    @Output() cancel = new EventEmitter<void>();

    statuses = Object.values(VehicleStatus);

    model: VehicleRequest = {
        plateNumber: '',
        brand: '',
        model: '',
        color: '',
        capacity: 0,
        modelYear: new Date().getFullYear(),
        status: VehicleStatus.AVAILABLE
    };

    ngOnInit() {
        if (this.vehicle) {
            this.model = {
                plateNumber: this.vehicle.plateNumber,
                brand: this.vehicle.brand,
                model: this.vehicle.model,
                color: this.vehicle.color,
                capacity: this.vehicle.capacity,
                modelYear: this.vehicle.modelYear,
                status: this.vehicle.status
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
