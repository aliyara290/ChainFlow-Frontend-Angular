import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, User, Mail, Phone, MapPin, Building, Map, Globe, Hash, X, Check } from 'lucide-angular';
import { Customer, CustomerRequest } from '../model/customer.model';

@Component({
    selector: 'app-customer-form',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
    @Input() customer: Customer | null = null;
    @Output() save = new EventEmitter<CustomerRequest>();
    @Output() cancel = new EventEmitter<void>();

    readonly User = User;
    readonly Mail = Mail;
    readonly Phone = Phone;
    readonly MapPin = MapPin;
    readonly Building = Building;
    readonly Map = Map;
    readonly Globe = Globe;
    readonly Hash = Hash;
    readonly X = X;
    readonly Check = Check;

    model: CustomerRequest = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        adresse: {
            street: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        }
    };

    ngOnInit() {
        if (this.customer) {
            this.model = {
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                email: this.customer.email,
                phone: this.customer.phone,
                adresse: { ...this.customer.adresse }
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
