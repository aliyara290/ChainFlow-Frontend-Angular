import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Driver, DriverRequest } from '../model/driver.model';

@Component({
    selector: 'app-driver-form',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
    templateUrl: './driver-form.component.html'
})
export class DriverFormComponent implements OnInit {
    @Input() driver: Driver | null = null;
    @Output() save = new EventEmitter<DriverRequest>();
    @Output() cancel = new EventEmitter<void>();

    model: DriverRequest = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        licenseType: '',
        licenseNumber: ''
    };

    ngOnInit() {
        if (this.driver) {
            this.model = {
                firstName: this.driver.firstName,
                lastName: this.driver.lastName,
                email: this.driver.email,
                phone: this.driver.phone,
                licenseType: this.driver.licenseType,
                licenseNumber: this.driver.licenseNumber
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
