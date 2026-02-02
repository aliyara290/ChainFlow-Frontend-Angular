import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Driver } from '../model/driver.model';
import * as DriverActions from '../store/driver.actions';
import * as DriverSelectors from '../store/driver.selectors';
import { DriverFormComponent } from '../driver-form/driver-form.component';

@Component({
    selector: 'app-driver-list',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, DialogModule, DriverFormComponent],
    templateUrl: './driver-list.component.html'
})
export class DriverListComponent implements OnInit {
    drivers$: Observable<Driver[]>;
    loading$: Observable<boolean>;
    driverDialog: boolean = false;
    selectedDriver: Driver | null = null;

    constructor(private store: Store) {
        this.drivers$ = this.store.select(DriverSelectors.selectAllDrivers);
        this.loading$ = this.store.select(DriverSelectors.selectDriverLoading);
    }

    ngOnInit() {
        this.store.dispatch(DriverActions.loadDrivers());
    }

    openNew() {
        this.selectedDriver = null;
        this.driverDialog = true;
    }

    editDriver(driver: Driver) {
        this.selectedDriver = { ...driver };
        this.driverDialog = true;
    }

    hideDialog() {
        this.driverDialog = false;
        this.selectedDriver = null;
    }

    onSave(driverData: any) {
        if (this.selectedDriver && this.selectedDriver.id) {
            this.store.dispatch(DriverActions.updateDriver({ id: this.selectedDriver.id, driver: driverData }));
        } else {
            this.store.dispatch(DriverActions.createDriver({ driver: driverData }));
        }
        this.driverDialog = false;
    }
}
