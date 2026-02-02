import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as fromCustomer from '../customers/store/customer.reducer';
import * as fromOrder from '../orders/store/order.reducer';
import * as fromDelivery from '../deliveries/store/delivery.reducer';
import * as fromDriver from '../drivers/store/driver.reducer';
import * as fromVehicle from '../vehicles/store/vehicle.reducer';

import { CustomerEffects } from '../customers/store/customer.effects';
import { OrderEffects } from '../orders/store/order.effects';
import { DeliveryEffects } from '../deliveries/store/delivery.effects';
import { DriverEffects } from '../drivers/store/driver.effects';
import { VehicleEffects } from '../vehicles/store/vehicle.effects';

export const PROVIDE_CUSTOMER_STORE: EnvironmentProviders = makeEnvironmentProviders([
    provideState({ name: 'customers', reducer: fromCustomer.customerReducer }),
    provideState({ name: 'orders', reducer: fromOrder.orderReducer }),
    provideState({ name: 'deliveries', reducer: fromDelivery.deliveryReducer }),
    provideState({ name: 'drivers', reducer: fromDriver.driverReducer }),
    provideState({ name: 'vehicles', reducer: fromVehicle.vehicleReducer }),
    provideEffects([
        CustomerEffects,
        OrderEffects,
        DeliveryEffects,
        DriverEffects,
        VehicleEffects
    ])
]);
