import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Vehicle } from '../model/vehicle.model';
import * as VehicleActions from '../store/vehicle.actions';
import * as VehicleSelectors from '../store/vehicle.selectors';
import { VehicleFormComponent } from '../vehicle-form/vehicle-form.component';

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, VehicleFormComponent],
    templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
    vehicles$: Observable<Vehicle[]>;
    loading$: Observable<boolean>;
    vehicleDialog: boolean = false;
    selectedVehicle: Vehicle | null = null;

    constructor(private store: Store) {
        this.vehicles$ = this.store.select(VehicleSelectors.selectAllVehicles);
        this.loading$ = this.store.select(VehicleSelectors.selectVehicleLoading);
    }

    ngOnInit() {
        this.store.dispatch(VehicleActions.loadVehicles());
    }

    openNew() {
        this.selectedVehicle = null;
        this.vehicleDialog = true;
    }

    editVehicle(vehicle: Vehicle) {
        this.selectedVehicle = { ...vehicle };
        this.vehicleDialog = true;
    }

    hideDialog() {
        this.vehicleDialog = false;
        this.selectedVehicle = null;
    }

    onSave(vehicleData: any) {
        if (this.selectedVehicle && this.selectedVehicle.id) {
            this.store.dispatch(VehicleActions.updateVehicle({ id: this.selectedVehicle.id, vehicle: vehicleData }));
        } else {
            this.store.dispatch(VehicleActions.createVehicle({ vehicle: vehicleData }));
        }
        this.vehicleDialog = false;
    }
}
