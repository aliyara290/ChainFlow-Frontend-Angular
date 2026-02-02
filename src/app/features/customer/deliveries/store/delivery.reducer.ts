import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Delivery } from '../model/delivery.model';
import * as DeliveryActions from './delivery.actions';

export interface DeliveryState extends EntityState<Delivery> {
    selectedDeliveryId: string | null;
    loading: boolean;
    error: any;
}

export const adapter: EntityAdapter<Delivery> = createEntityAdapter<Delivery>();

export const initialState: DeliveryState = adapter.getInitialState({
    selectedDeliveryId: null,
    loading: false,
    error: null,
});

export const deliveryReducer = createReducer(
    initialState,
    on(DeliveryActions.loadDeliveries, (state) => ({ ...state, loading: true, error: null })),
    on(DeliveryActions.loadDeliveriesSuccess, (state, { deliveries }) => adapter.setAll(deliveries, { ...state, loading: false })),
    on(DeliveryActions.loadDeliveriesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DeliveryActions.loadDelivery, (state) => ({ ...state, loading: true, error: null })),
    on(DeliveryActions.loadDeliverySuccess, (state, { delivery }) => adapter.upsertOne(delivery, { ...state, loading: false, selectedDeliveryId: delivery.id })),
    on(DeliveryActions.loadDeliveryFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DeliveryActions.createDelivery, (state) => ({ ...state, loading: true, error: null })),
    on(DeliveryActions.createDeliverySuccess, (state, { delivery }) => adapter.addOne(delivery, { ...state, loading: false })),
    on(DeliveryActions.createDeliveryFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DeliveryActions.updateDelivery, (state) => ({ ...state, loading: true, error: null })),
    on(DeliveryActions.updateDeliverySuccess, (state, { delivery }) => adapter.updateOne({ id: delivery.id, changes: delivery }, { ...state, loading: false })),
    on(DeliveryActions.updateDeliveryFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(DeliveryActions.deleteDelivery, (state) => ({ ...state, loading: true, error: null })),
    on(DeliveryActions.deleteDeliverySuccess, (state, { id }) => adapter.removeOne(id, { ...state, loading: false })),
    on(DeliveryActions.deleteDeliveryFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();
